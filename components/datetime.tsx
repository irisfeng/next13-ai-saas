import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

function DateTime() {
  const [date, setDate] = useState(moment().tz("Asia/Shanghai").format('MM月DD日 HH:mm'));

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(moment().tz("Asia/Shanghai").format('MM月DD日 HH:mm'));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {/* <h2>当前时间：</h2> */}
      <p>{date}</p>
    </div>
  );
}

export default DateTime;