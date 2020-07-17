import React, { useContext, useMemo } from "react";
import { Skeleton, Card, Tag, Avatar, Col, Row } from "antd";
import { EditOutlined, DeleteOutlined, TagOutlined, FieldTimeOutlined   } from '@ant-design/icons';
import moment from "moment";

import { appContext } from "../context";
import dayjs from "dayjs";
import Item from "antd/lib/list/Item";

const { Meta } = Card;

export default () => {
  const { state, setState } = useContext(appContext);
  
  const notesList = useMemo(() => {
      let notes = state.notes;
      return  notes.sort((a: any, b: any) => b.updatedAt - a.updatedAt)
  },[state.notes]);
 
  const deleteNote = ( id:number) => {
      const notesData = state.notes.filter(item => item.id !== id );
     
    setState((prev: any) => {
        
        return ({ ...prev, notes: notesData });
    });
  }; 

  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {notesList.map((item, i) => {
             
          const dateContent = (
           <>
            {item.updatedAt && (
              <div className="datetime">
                <FieldTimeOutlined style={{ fontSize: '22px', margin: '0rem 0.5rem 0rem 0', }} />
                {dayjs(item.updatedAt).format('dd MMM YYYY hh:mm A')}
                
              </div>
            )}
         </>
          );
            const tags = item.tags && item.tags.map(item => <Tag icon={<TagOutlined />} key={item} style={{marginTop: 8}} color="#ef7723">{item}</Tag>);
            return (
              <div key={i}>
                <Card
                key={item.id}
                  title={item.title}                
                  style={{ width: 300, marginRight: 8, marginBottom: 8 }}
                  actions={[
                    <DeleteOutlined key="delete" onClick={()=> { deleteNote(item.id) }} />,
                    <EditOutlined onClick={() => {
                        setState((prev: any) => {
                            console.log(item.id);
                            return ({ ...prev, drawerOpen: true, currentNote: item.id });
                        });
                    }} key="edit" />
                   
                  ]}
                >
                {dateContent}                
                 <p className="projectItemContent">{item.content}</p>
                {tags ? 
                <div>
                     {tags}
                 </div> : '' }
                 
                  
                </Card>
                
              </div>
            );
          })}
        </Row>
      </div>
    </>
  );
};
