import React, { component, useEffect, useState } from "react";
import Smiley from "../../../assets/images/smiley.svg";
import SadFace from "../../../assets/images/sad-face.svg";
import s from "./reports.module.css";
import instance from "../../../services/axios";
import { tagService } from "../../../services/api";
import {
  Chart as ChartJs,
  Tooltip,
  Title,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import {
  interviewsPerWeekOptions,
  pieOptions,
  getResolution,
} from "./graphOptions";
import { getLoggedInData } from "../../../services/auth";
import axios from "axios";
import {
  getBackgroundColors,
  getData,
  getLables,
  setChartDataset,
} from "../../../utils/chartsHelper";
ChartJs.register(
  Tooltip,
  Title,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);
export const Report = () => {
  const dummyData = {
    datasets: [{ data: [10] }],
    labels: ["Red"],
  };
  const [data, setData] = useState(dummyData);
  const [interviewsBarCahrt, setInterviewsBarCahrt] = useState(dummyData);
  const [interviewData, setInterviewData] = useState([]);
  const getInterviewData = async () => {
    const response = await instance.get(`${tagService}interview/tag/slot/${getLoggedInData().userEmailId}`)
    if (response.data) {
      const teckTraclLables = getLables(response.data, "techTrack");
      const dateLables = getLables(response.data, "interviewerAvailDate");
      let bgColor = getBackgroundColors(dateLables);
      const PirChartData = setChartDataset([{
        data: getData(response.data, teckTraclLables, "techTrack"),
        backgroundColor: bgColor,
        labels: teckTraclLables
      }])
      let a = []
      teckTraclLables.forEach((element,i) =>
        a.push({
          data: getData(response.data.filter(item => item.techTrack.toLowerCase() === element.toLowerCase()), dateLables, "interviewerAvailDate"),
          backgroundColor: bgColor[i],
          labels: dateLables,
          label: element,
        })
      );
      const interviewsBarCahrt = setChartDataset(a)
      setData(PirChartData);
      setInterviewsBarCahrt(interviewsBarCahrt);
      setInterviewData(response.data);
    }
  };
  useEffect(() => {
    getInterviewData();
  }, []);
  const isPastDate = function (firstDate) {
    firstDate = new Date(firstDate.split(":").join("-"));
    const secondDate = new Date();
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  };
  return (
    <div className="">
      <h1>
        Reports
        {/* {getLoggedInData().userRole == "INTERVIEWER" ? "Interviewer" : "Tag"} */}
      </h1>
      <h4>Welcome back {getLoggedInData().userName || ""}!</h4>
      {/* <h1>Reports- TAG</h1>
      <h4>Welcome back!</h4> */}
      <div className={s.reportcount}>
        <div className={s.totalCount}>
          <div className={s.interviewsCount}>
            <h3>All interviews</h3>
            <h1>{interviewData.length || 0}</h1>
          </div>
          <div className={s.scheduledCount}>
            <h3>Booked</h3>
            <h1>
              {interviewData
                .filter((item) => !isPastDate(item.interviewerAvailDate))
                .filter((item) => item.bookedStatus === "BOOKED").length || 0}
            </h1>
            {/* <h1>15</h1> */}
          </div>
          <div className={s.completedcount}>
            <h3>Completed</h3>
            <h1>
              {interviewData
                .filter((item) => isPastDate(item.interviewerAvailDate))
                .filter((item) => item.bookedStatus !== "CANCELED").length || 0}
            </h1>
          </div>
          <div className={s.cancelledcount}>
            <h3>Cancelled</h3>
            <h1>
              {interviewData.filter((item) => item.bookedStatus === "CANCELED")
                .length || 0}
            </h1>
          </div>
        </div>
        <div className={s.graphs}>
          {/* <div className={s.interviewtype}>
            <h4> interview Types</h4>
            <div className={s.typesRow}>
              <div className={s.typeWrapper}>
                <div className={`${s.circle} ${s.fullStack}`}>
                  <div className={s.fullStackText}>90%</div>
                </div>
                <div>
                  <h4 className={s.typeTitle}>Full stack developer</h4>
                  <div className={s.typeText}>
                    Lorem Ipsum is Lorem Ipsum has been the industry's standard
                    dummy
                  </div>
                </div>
              </div>
              <div className={s.typeWrapper}>
                <div className={`${s.circle} ${s.frontend}`}>
                  <div className={s.frontendText}>55%</div>
                </div>
                <div>
                  <h4 className={s.typeTitle}>Frontend developer</h4>
                  <div className={s.typeText}>
                    Lorem Ipsum is simply Ipsum has been the industry's standard
                    dummy
                  </div>
                </div>
              </div>
              <div className={s.typeWrapper}>
                <div className={`${s.circle} ${s.dbms}`}>
                  <div className={s.dbmsText}>21%</div>
                </div>
                <div>
                  <h4 className={s.typeTitle}>DBMS</h4>
                  <div className={s.typeText}>
                    Lorem Ipsum is Lorem Ipsum has been the industry's standard
                    dummy
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className={s.interviewpanelfeedback}>
            <div>
              <h4>Interview panel Feedback</h4>
              <div className={s.row}>
                <div className={`${s.panelRow} ${s.successPanel}`}>
                  <img src={Smiley} className={s.expression} />
                  <div className={s.percentageText}>60%</div>
                </div>
                <div className={s.panelContent}>
                  <div className={s.panelTitle}>Positive FeedBack</div>
                  <div className={s.panelText}>
                    Here we can find the feedback given by interviews and
                    percentage of the positive feedback
                  </div>
                </div>
              </div>
              <div className={s.row}>
                <div className={`${s.panelRow} ${s.failedPanel}`}>
                  <img src={SadFace} className={s.expression} />
                  <div className={s.percentageText}>40%</div>
                </div>
                <div className={s.panelContent}>
                  <div className={s.panelTitle}>Negative FeedBack</div>
                  <div className={s.panelText}>
                    Here we can find the feedback given by interviews and
                    percentage of the negative feedback
                  </div>
                </div>
              </div>
            </div>
            <div className={s.feedbackStats}>
              <div className={s.feedbackRow}>
                <div>
                  <div className={`${s.box}`} />
                  <div>100%</div>
                  <div className={s.feedbackTitle}>Lorem Ipsum</div>
                  <div className={s.feedbackText}>
                    Lorem Ipsum is Lorem been the industry's
                  </div>
                </div>
                <div>
                  <div className={`${s.box} ${s.box1}`}>
                    <div className={s.innerBox1} />
                  </div>
                  <div>75%</div>
                  <div className={s.feedbackTitle}>Lorem Ipsum</div>
                  <div className={s.feedbackText}>
                    Lorem Ipsum is Lorem been the industry's
                  </div>
                </div>
                <div>
                  <div className={`${s.box} ${s.box2}`}>
                    <div className={s.innerBox2} />
                  </div>
                  <div>50%</div>
                  <div className={s.feedbackTitle}>Lorem Ipsum</div>
                  <div className={s.feedbackText}>
                    Lorem Ipsum is Lorem been the industry's
                  </div>
                </div>
                <div>
                  <div className={`${s.box} ${s.box3}`}>
                    <div className={s.innerBox2} />
                    <div className={s.innerBox3} />
                  </div>
                  <div>25%</div>
                  <div className={s.feedbackTitle}>Lorem Ipsum</div>
                  <div className={s.feedbackText}>
                    Lorem Ipsum is Lorem been the industry's
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className={s.technopiechart}>
            <h4>Technologies</h4>
            <div className={s.pieContainer}>
              <Pie
                data={data}
                style={{ width: "30%", height: "30%" }}
                options={pieOptions}
              />
            </div>
          </div>
          <div className={s.interviewcolumnchart}>
            <h4>Interviews All Time</h4>
            <Bar data={interviewsBarCahrt} options={interviewsPerWeekOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
