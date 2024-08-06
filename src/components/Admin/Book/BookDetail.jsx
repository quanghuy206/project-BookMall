import { Badge, Descriptions, Divider, Drawer, Image, Modal, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
const BookDetail = (props) => {

    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail, } = props
    //Image
    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState("")
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        let imgThumbnail = {}, imgSilder = []
        if (dataViewDetail?.thumbnail) {
            imgThumbnail = {
                uid: uuidv4(),
                name: dataViewDetail.thumbnail,
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataViewDetail.thumbnail}`,
            }
        }
        if (dataViewDetail?.slider && dataViewDetail.slider.length > 0) {
            dataViewDetail.slider.map(item => {
                imgSilder.push({
                    uid: uuidv4(),
                    name: item,
                    stats: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`
                    
                })
                
            })
        }
        setFileList([imgThumbnail,...imgSilder])
    }, [dataViewDetail])

    const handlePreview = async (file) => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleCancel = () => setPreviewOpen(false)


    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                open={openViewDetail}
                onClose={onClose}
            >
                <Descriptions title={dataViewDetail?.mainText} bordered column={2}>
                    <Descriptions.Item label="Id" >{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên sách">{dataViewDetail?.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả">{dataViewDetail?.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">{dataViewDetail?.price}</Descriptions.Item>
                    <Descriptions.Item label="Thể loại" span={3}>
                        <Badge status="processing" text={dataViewDetail?.category} />
                    </Descriptions.Item>
                    <Descriptions.Item label="CreatedAt">{dataViewDetail?.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="UpdatedAt">{dataViewDetail?.updatedAt}</Descriptions.Item>
                </Descriptions>
                <Divider orientation="left" >
                    Hình ảnh
                </Divider>
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={
                        { showRemoveIcon: false }
                    }
                >
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Drawer>
        </>
    )
}

export default BookDetail