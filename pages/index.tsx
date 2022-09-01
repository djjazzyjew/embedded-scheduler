import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { BrowserOnlyReactJson } from "../components/BrowserOnlyReactJson"
import dayjs from "dayjs"
import Event from "../components/Event"
import styles from '../styles/Home.module.css'

function EmbeddedIframe() {
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingInfo, setBookingInfo] = useState(false)
  const [bookingInfoExpanded, setBookingInfoExpanded] = useState(false)

  return (
    <>
      <Head>
        <title>Nylas Demo</title>
        <meta name="description" content="Created by Nylas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <div>
        <div>
          <header>
            <h1 className={styles.title}>Your App</h1>
          </header>
          <div>
            <main>
              <h2>
                <span>Hello, User!</span> - Book Your Follow-up Appointment through an embedded iframe
              </h2>
              <div>
                <div>
                  <h2>Booking</h2>
                  {bookingComplete && (
                    <>
                      <span> - Success! - </span>
                      <span
                        onClick={() =>
                          setBookingInfoExpanded(!bookingInfoExpanded)
                        }
                      >
                        <b>Click here to see booking data captured by redirect page</b>
                        {"  "}
                      </span>
                      {bookingInfoExpanded && (
                        <BrowserOnlyReactJson
                          src={bookingInfo.responseData ?? {}}
                          theme="summerfruit:inverted"
                          collapseStringsAfterLength={50}
                        />
                      )}
                    </>
                  )}
                </div>
                {bookingComplete && (
                  <div className="custom-logic">
                    <p>
                      You are booked to see <b>{bookingInfo.responseData.additional_values.organizer[0].name}</b> at{" "}
                      <span>
                        <b>{bookingInfo.responseData.location}</b>
                      </span>{" "}
                      on{" "}
                      <span>
                        <b>{dayjs
                          .unix(bookingInfo.responseData.start_time)
                          .format("dddd MMMM D [at] h:mma")}</b>
                      </span>
                    </p>
                  </div>
                )}
                <div>
                  <div> 
                    {bookingComplete && (
                      <>
                      </>
                    )}
                    {!bookingComplete && (
                      <>
                      <iframe
                        height="660"
                        width="1000"
                        src={`${encodeURI(
                          // Enter custom Nylas scheduling page URI as string
                          "https://schedule.nylas.com/local-embedded-scheduler?name=Terry Hughes&email=terry.hughes@nylas.biz"
                        )}`}
                      ></iframe>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {bookingComplete && (
                <>
                <div className="custom-logic">
                  <h3>Next Steps</h3>
                  <p>Trigger next steps in your application flow here</p>
                </div>
                </>
              )}
              <div>
                <h2>Past Appointments</h2>

                <div className="grid">
                  <div>
                    <div>date</div>
                    <div>type</div>
                    <div>doctor</div>
                    <div>notes</div>
                  </div>
                  <div>
                    <div>
                      {dayjs().subtract(2, "weeks").format("MM/DD/YYYY")}
                    </div>
                    <div>Exam</div>
                    <div>Mendoza</div>
                    <div>Schedule a follow up in 2 weeks</div>
                  </div>
                  <div>
                    <div>
                      {dayjs().subtract(1, "year").add(2, "weeks").format("MM/DD/YYYY")}
                    </div>
                    <div>Physical</div>
                    <div>Mendoza</div>
                    <div>Did blood work</div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Event setBookingComplete={setBookingComplete} setBookingInfo={setBookingInfo} />
      </main>
    </>
  )
}

export default EmbeddedIframe
