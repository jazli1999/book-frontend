import { Card, Col, Divider, Row, Space } from "antd";
import React from "react";
import { BookList } from "../profilePage";

export default function ExchangeDetailsCard() {
  const chosenBooks = [
    {
      cover:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      mark: "isFavorite",
    },
    {
      cover:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      mark: "isFavorite",
    },
  ];

  return (
    <div>
        <Col span={8}>
          <Row>
            <Card title="Deposit" size="small">
              <Row>
                <BookList title="Choosen books" bookList={chosenBooks} isEditable={false} />
                <Divider dashed/>
              </Row>
              <Row>
                <div >
                <p>
                  Deposit will be returned once the other side confirms
                  receiving your books{" "}
                </p>
                <p>
                  We take 0.5€ per book you exchange. Premium members don't pay any fee!
                </p>
                <Divider />
                <b>Total</b>
                </div>
              </Row>
            </Card>
          </Row>
        </Col>
    </div>
  );
}
