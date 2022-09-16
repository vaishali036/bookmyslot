import React, { useEffect, useState } from "react";
import s from './Dashboard.module.css';
import { Form, Tabs, Tab } from "react-bootstrap";
import { InterviewTabs } from "../../components/InterviewCard_tag_dash_page/InterviewTab";
import { cloneObjectDeeply, isPastDate } from '../../../utils/helperMethods';
import panalist from './business-time-solid.svg';
import remainder from './bell-solid.svg';
import feedback from './message-solid.svg';
import { getAllSlotsByInterviewer, getAllSlotsByTagTeam, getTagDashboardData } from "../../../services/api";
import { getLoggedInData } from "../../../services/auth";
const defaultFilters = {
  techTrack: null,
  date: null,
  slotFrom: null,
  slotTo: null,
}
export const Dashboard = (props) => {
  // console.log(getLoggedInData().userRole)
  const [bookedStatus, setStatus] = useState("BOOKED");
  const [interviewData, setInterviewData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, updateFilters] = useState(cloneObjectDeeply(defaultFilters))
  const [refresh,setRefresh]= useState(0)


  const getAllSlotData = async () => {
    let response;
    if (getLoggedInData().userRole.toUpperCase() === 'INTERVIEWER') {
      response = await getAllSlotsByInterviewer(getLoggedInData().userEmailId);    // api get all BOOKED, CANCELED and PAST slots by Interviewer
    }
    if (getLoggedInData().userRole.toUpperCase() === 'TAG') {
      response = await getAllSlotsByTagTeam(getLoggedInData().userEmailId);    // api get all BOOKED, CANCELED and PAST slots by tagteam
    }
    if (response && response.data) {
      setInterviewData(response.data);
      setFilteredData(response.data);
    }
  }
  useEffect(() => {
    getAllSlotData()
  }, [refresh]);
  const update = (data) => {
    let aa = interviewData.filter((x) => {
      return x.bookedSlotId ? x.bookedSlotId === data.bookedSlotId ? x.bookedStatus = 'CANCELED' : true : true
    });
    setInterviewData(aa);
    setFilteredData(aa);
  }
  const handleFilterSelect = (e, key) => {
    filters[key] = e.target.value;
    updateFilters({ ...filters })
  }
  const handleFiltersUpdate = () => {
    let data = interviewData;
    if (filters.techTrack?.length) {
      data = data.filter(item => {
        return item.techTrack.toLowerCase() === filters.techTrack;
      })
    }
    if (filters.date?.length) {
      data = data.filter(item => {
        const splittedDate = item.interviewerAvailDate.split(':');
        const requiredString = splittedDate.join('-');
        const x = new Date(requiredString);
        const y = new Date(filters.date);
        return +x === +y;
      })
    }
    if (filters.slotFrom?.length) {
      data = data.filter(item => {
        const splittedTime = item.slotFrom.split(':');
        const splittedFilter = filters.slotFrom.split(':');
        return +splittedTime[0] >= +splittedFilter[0] && +splittedTime[1] >= +splittedFilter[1];
      })
    }
    if (filters.slotTo?.length) {
      data = data.filter(item => {
        const splittedTime = item.slotTo.split(':');
        const splittedFilter = filters.slotTo.split(':');
        return +splittedTime[0] <= +splittedFilter[0] && +splittedTime[1] <= +splittedFilter[1];
      })
    }
    setFilteredData([...data])
  }

  return (
    <div className="">
      <h1>Dashboard</h1>
      {/* <h1>Dashboard-{getLoggedInData().userRole.toUpperCase=='INTERVIEWER' ? 'Interviewer' : 'Tag'}</h1> */}

      <h4>Welcome back {getLoggedInData().userName || ''}!</h4>
      <div className="row">
        <div className="col-md-8 col-sm-12 p-2">
          <fieldset>
            <div className={s.interview_schedule}>
              {/* <div className={s.status_cancel}> */}
              {/* <legend style={{ backgroundColor: bookedStatus === 'CANCELED' && 'red' }}>{`${bookedStatus}`}</legend> */}
              <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3 nav-fill px-4 py-2"
              >
                <Tab eventKey="home" title="BOOKED" onClick={() => { setStatus('BOOKED') }}>
                  <InterviewTabs
                    status={'BOOKED'}
                    refresh={()=>setRefresh(key=>key+1)}
                    interviewData={filteredData
                      .filter((item) => !isPastDate(item.interviewerAvailDate))
                      .filter(item => item.bookedStatus === 'BOOKED')
                      .sort()
                    }
                    update={update}
                    userType={getLoggedInData().userRole.toUpperCase()}
                  />
                </Tab>
                <Tab eventKey="profile" title="CANCELED" tabClassName={s.redBG} onClick={() => { setStatus('CANCELED') }}>
                  <InterviewTabs
                    status={'CANCELED'}
                    refresh={()=>setRefresh(key=>key+1)}
                    interviewData={filteredData
                      .filter(item => item.bookedStatus === 'CANCELED')
                    }
                    // update={() => update}
                    userType={getLoggedInData().userRole.toUpperCase()}
                  />
                </Tab>
                <Tab eventKey="contact" title="Past Slots" onClick={() => { setStatus('pastslots') }}>
                  <InterviewTabs
                    status={'BOOKED'}
                    refresh={()=>setRefresh(key=>key+1)}
                    interviewData={filteredData
                      .filter((item) => isPastDate(item.interviewerAvailDate))
                      .filter(item => item.bookedStatus !== 'CANCELED')
                    }
                    // update={() => update}
                    userType={getLoggedInData().userRole.toUpperCase()}
                  />
                </Tab>
              </Tabs>
            </div>
          </fieldset>
        </div>
        <div className="col-md-4 col-sm-12">
          <br />
          <div className="d-flex align-items-center flex-wrap">
            <div className={s.filterHead}>
              <legend>Filter Booked Slots</legend>
              <div className="col-12 p-4">
                <Form.Select
                  className={s.teckSelect}
                  onChange={(e) => { handleFilterSelect(e, 'techTrack') }}
                  defaultValue=''
                >
                  <option value="" selected>--select Tech-Track--</option>
                  <option value="frontend">Front-End Developer</option>
                  <option value="backend">Back-End Developer</option>
                  <option value="fullstack">Full Stack Developer</option>
                  <option value="softwarearchitect">Software Architecture</option>
                  <option value="mobile_dev">Mobile Developer</option>
                  <option value="data_science">Data Science</option>
                </Form.Select>
              </div>
              <div className="col-12 mb-2 dash">
                <div className="row align-items-center px-4">
                  <div className="col-6">
                    <label>Select the date :</label>
                    <br />
                    <input type="date" id="date" name="date" onChange={e => { handleFilterSelect(e, 'date') }} />
                  </div>
                  <div className="col-6">
                    <label>Select the slot :</label>
                    <div className={s.rowFlex}>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        onChange={e => {
                          handleFilterSelect(e, 'slotFrom')
                        }}
                      />
                      <label style={{ fontSize: '20px' }}>-</label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        onChange={e => {
                          handleFilterSelect(e, 'slotTo')
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ textAlign: 'center', padding: '10px' }}
                  onClick={handleFiltersUpdate}
                >
                  View Bookings
                </button>
              </div>
            </div>
          </div>
          <div className=" col-sm-12">
            <br />
            <div className="d-flex align-items-center flex-wrap">
              <div className={s.filterHead}>
                <legend>Reminders</legend>
                {/* <FontAwesomeIcon icon={faPencil} /> */}
                <div className="panalistremainders">
                  <h4><img1 src={panalist} />All Panalists</h4>
                </div>
                <div className="remainderpancel">
                  <h4><img1 src={remainder} /> Send Reminder to Panel</h4>
                </div>
                <div className="feedback">
                  <h4><img1 src={feedback} />Interview Feedback</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}