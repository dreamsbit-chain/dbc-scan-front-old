import React from "react";

import Finder from "../../components/Finder";

import s from "./EventLogs.module.scss";

const renderValue = (eventLog: EventLog) => {
  return eventLog.type === "address" ? (
    <Finder q="address">{eventLog.value as string}</Finder>
  ) : (
    eventLog.value
  );
};

const EventLogs = ({ eventLogs }: { eventLogs: EventLog[] }) => {
  return (
    <>
      {eventLogs.map((eventLog, index) => (
        <div>
          <div className={s.head}>[{index}]</div>
          <div className={s.body}>
            {eventLog.name && (
              <div className={s.item}>
                <div className={s.key}>name</div>
                <div className={s.value}>{eventLog.name}</div>
              </div>
            )}
            {eventLog.name && (
              <div className={s.item}>
                <div className={s.key}>value</div>
                <div className={s.value}>{renderValue(eventLog)}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default EventLogs;
