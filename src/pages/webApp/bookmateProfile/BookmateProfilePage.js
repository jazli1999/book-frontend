import React, { useState, useEffect } from "react";
import BookmateDetails from "./BookmateDetails";
import { useParams } from "react-router";
import { Row } from "antd";
import "../index.less";


export default function BookmateProfilePage() {
  const { id } = useParams(); //retrieve the id  dynamic params from the current URL

  const getUserDetail = () => {
    //normally it will retrieve from backend.Since it's not implemented yet, we return a constant data for noww
    // 👇️ refers to the div element

    const bookmateData = {
      username: 'erengulum',
      about: "I love reading",
      country: "Germany",
      state: "Bavaria",
      city: "München",
    };
    return bookmateData;
  };

  //lifecycle hook
  const [userInfo, setUserInfo] = useState([]);

  //Thanks to the use effect, we can execute the code we want to load.The page will execute the code every time it is loaded.
  useEffect(() => {
    setUserInfo(getUserDetail());
  }, []);

  console.log("user id", id);

  return (
    <div className="centerized">
      <h2>User Details</h2>
      <Row>
        <BookmateDetails  bookmateData={userInfo}/>
      </Row>
    </div>
  );
}
