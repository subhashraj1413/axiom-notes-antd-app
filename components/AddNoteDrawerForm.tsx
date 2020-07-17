import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Divider,
  Select,
  PageHeader,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { appContext } from "../context";
import { getTags } from "../utils/tags";
import { FormInstance } from "antd/lib/form";

const { Option } = Select;

export function AddNoteDrawerForm() {
  const { setState: setGlobalState, state: appState } = useContext(appContext);
  const formRef = useRef<FormInstance>();

  function showDrawer() {
    setGlobalState({ drawerOpen: true });
    if (formRef.current) {
      formRef.current.resetFields();
    }
  }

  useEffect(() => {
    if (appState.currentNote) {
      const note = appState.notes.find(
        (res) => res.id === appState.currentNote
      );
      if (note && formRef.current) {
        formRef.current.setFieldsValue(note);
      }
    }
  }, [appState]);

  function onClose() {
    setGlobalState({ drawerOpen: false });
  }

  function onSubmit(value) {
    setGlobalState(({ notes }) => {
      if (appState.currentNote) {
        const note = appState.notes.findIndex(
          (note) => note.id === appState.currentNote
        );
        const notesData: typeof appState.notes = Array.from(notes);
        notesData[note] = {
          ...value,
          id: notesData[note].id,
          updatedAt: new Date(),
        };
        const currentNote = null;
        return {
          notes: notesData,
          currentNote: currentNote,
        };
      } else {
        return {
          notes: [
            {
              ...value,
              id: Math.ceil(Math.random() * 1000000),
              updatedAt: new Date(),
            },
            ...notes,
          ],
          currentNote: null,
        };
      }
    });
    formRef.current.resetFields();
    onClose();
  }

  return (
    <>
      <PageHeader
        ghost={false}
        title="Your Notes"
        key="page-header"
        extra={[
          <Button
            type="primary"
            key="add-note"
            className="site-button"
            onClick={showDrawer}
            style={{ float: "right"}}
          >
            <PlusOutlined /> New Note
          </Button>,
        ]}
      ></PageHeader>
      <Drawer
        title="Create a New Note"
        width={320}
        onClose={onClose}
        visible={appState.drawerOpen}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout="vertical"
          ref={formRef}
          hideRequiredMark
          onFinish={onSubmit}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="content"
                label="Content"                
              >
                <Input.TextArea rows={4} placeholder="Please enter content" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="tags"
                label="Tags"
               
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Add Tags"
                >
                  {appState &&
                    getTags(appState).map((res) => {
                      return (
                        <Option key={res} value={res}>
                          {res}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider dashed />
          <Row gutter={16}>
            <Col span={24}>
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Button onClick={onClose} style={{ marginRight: 16 }}>
                  Cancel
                </Button>
                <Button htmlType="submit" className="site-button"  style={{ width: 100 }} type="primary">
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}

export default AddNoteDrawerForm;
