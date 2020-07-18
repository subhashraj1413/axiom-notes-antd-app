import React, { useContext, useMemo } from "react";
import { Card, Tag, Row, Result, Col } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  TagOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

import { appContext } from "../context";
import dayjs from "dayjs";

const { Meta } = Card;

export default () => {
  const { state, setState } = useContext(appContext);

  const notesList = useMemo(() => {
    let notes = state.notes;
    let substring = state.searchText || null;
    let notesResult = notes;
    let filterTags = state.filterTags || null;
    if (substring) {
      notesResult = notes.filter((note) => {
        if (
          note.title.toLowerCase().includes(substring.toLowerCase()) ||
          note.content.toLowerCase().includes(substring.toLowerCase())
        ) {
          return note;
        }
      });
      
    } else if(filterTags && filterTags.length !== 0){
      notesResult = notes.filter(note => {
        return filterTags.some(tag => note.tags.indexOf(tag) !== -1);
      });
    }     
    return notesResult.sort((a: any, b: any) => b.updatedAt - a.updatedAt);
    
  }, [state]);

  const deleteNote = (id: number) => {
    const notesData = state.notes.filter((item) => item.id !== id);

    setState((prev: any) => {
      return { ...prev, notes: notesData };
    });
  };

  return (
    <>
      <div className="site-card-wrapper">
      {notesList.length < 0 ? (
            <Result
              status="info"
              title="Notes Not Found, Please try another something else!"
            />
          ) : ''}
        <Row gutter={16}>
        
          {notesList?.map((item, i) => {
            const dateContent = (
              <>
                {item.updatedAt && (
                  <div className="datetime">
                    <FieldTimeOutlined
                      style={{ fontSize: "22px", margin: "0rem 0.5rem 0rem 0" }}
                    />
                    {dayjs(item.updatedAt).format("dd MMM YYYY hh:mm A")}
                  </div>
                )}
              </>
            );
            const tags =
              item.tags &&
              item.tags.map((item) => (
                <Tag
                  icon={<TagOutlined />}
                  key={item}
                  style={{ marginTop: 8 }}
                  color="#ef7723"
                >
                  {item}
                </Tag>
              ));
            return (
              <Col key={i} xs={24} sm={24} md={12} xl={8}>
                <Card
                  key={item.id}
                  title={item.title}
                  style={{}}
                  actions={[
                    <DeleteOutlined
                      key="delete"
                      onClick={() => {
                        deleteNote(item.id);
                      }}
                    />,
                    <EditOutlined
                      onClick={() => {
                        setState((prev: any) => {
                          console.log(item.id);
                          return {
                            ...prev,
                            drawerOpen: true,
                            currentNote: item.id,
                          };
                        });
                      }}
                      key="edit"
                    />,
                  ]}
                >
                  {dateContent}
                  <p className="projectItemContent">{item.content}</p>
                  {tags ? <div>{tags}</div> : ""}
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};
