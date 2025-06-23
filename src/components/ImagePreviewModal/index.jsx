import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Spin, Row, Col, Empty } from "antd";
import api from "../../utils/axios";
import style from "./index.module.scss";

const ImagePreviewModal = forwardRef(({ title = "Şəkil önizləməsi" }, ref) => {
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (urls) => {
    try {
      setLoading(true);
      const base64List = await Promise.all(
        urls.map(async (url) => {
          try {
            const res = await api.get(url, { responseType: "text" });
            return res.data;
          } catch (err) {
            console.error("Failed to load image:", url);
            return null;
          }
        })
      );
      setImages(base64List.filter(Boolean));
    } catch (err) {
      console.error("Image load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    open(imageUrls = []) {
      fetchImages(imageUrls);
      setVisible(true);
    },
    close() {
      setVisible(false);
      setImages([]);
    },
  }));

  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      title={title}
      width={900}
      className={style.modal}>
      {loading ? (
        <Spin />
      ) : images.length === 0 ? (
        <Empty description="Şəkil tapılmadı" />
      ) : (
        <Row gutter={[16, 16]}>
          {images.map((img, idx) => (
            <Col span={12} key={idx}>
              <div
                style={{
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                }}>
                <img
                  src={img}
                  alt={`Preview ${idx}`}
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "contain",
                    borderRadius: 8,
                    boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Modal>
  );
});

export default ImagePreviewModal;
