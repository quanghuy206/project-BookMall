import { Col, Form, Input, InputNumber, Modal, Row, Select, Space, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { callGetCategoryBook, callUploadBookImg } from '../../../services/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Loading from '../../Loading/index'
const BookModalCreate = (props) => {
    const { openModalAddBook, setOpenModalAddBook } = props
    const [loading, setLoading] = useState(false);
    const [listCategory, setListCategory] = useState([])


    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewTitle,setPreviewTitle] = useState("")
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    //state Image Thumbnail - Slider
    const [imgThumbnail, setImgThumbnail] = useState([]);
    const [imgSlider, setImgSlider] = useState([]);

    //set Form when click OK without using form
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log('imgThumbnail:', imgThumbnail);
        console.log('imgSlider:', imgSlider);
    };

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await callGetCategoryBook()
            if (res && res.data) {
                const d = res.data.map(item => {
                    return { label: item, value: item }
                })
                setListCategory(d)
            }
        }
        fetchCategory()

    }, [])

    //Check Upload Image
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    //
    const handleChange = (info, type) => {
        if (info.file.status === 'uploading') {
            type ? setLoadingSlider(true) : setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                type ? setLoadingSlider(false) : setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file)
        if (res && res.data) {
            setImgThumbnail({
                name: res.data.fileUploaded,
                uid: file.uid
            })
            onSuccess("ok");
        }
        else {
            onError("Đã có lỗi xảy ra khi upload")
        }
    };
    const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file)
        if (res && res.data) {
            setImgSlider((dataSlider) => [...dataSlider, {
                name: res.data.fileUploaded,
                uid: file.uid
            }])
            onSuccess("ok");
        }
        else {
            onError("Đã có lỗi xảy ra khi upload")
        }
    };

    //Preview Image
    const handlePreview = async (file) => {
        getBase64(file.originFileObj, (url) => {
            setPreviewImage(url)
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
        });

    };

    //Remove Image in Modal
    const handleRemove = (file,type) => {
        if(type === "thumbnail"){
            setImgThumbnail([])
        }
        if(type === "slider")
        {
            const newSliderImg = imgSlider.filter(x => x.uid !== file.uid)
            setImgSlider(newSliderImg)
        }
    }
    return (
        <>
            <Modal title="Basic Modal"
                width={"70vw"}
                open={openModalAddBook}
                onOk={() => { form.submit() }}
                onCancel={() => setOpenModalAddBook(false)}
            >
                <Form
                    form={form}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tên sách"
                                name="mainText"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tác giả"
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Giá tiền"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <InputNumber addonAfter="VND"
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Thể loại"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Select
                                    defaultValue={listCategory[0]}
                                    options={listCategory}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Số lượng"
                                name="quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: '100%' }}

                                />

                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Đã bán"
                                name="sold"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Ảnh thumb"
                                name="thumbnail"
                            >
                                <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    customRequest={handleUploadFileThumbnail}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                    onRemove={(file) => handleRemove(file,"thumbnail")}
                                >
                                    <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>

                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Ảnh Silder"
                                name="silder"
                            >
                                <Upload
                                    name="Silder"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    multiple={true}
                                    customRequest={handleUploadFileSlider}
                                    beforeUpload={beforeUpload}
                                    onChange={(info) => handleChange(info, 'slider')}
                                    onPreview={handlePreview}
                                    onRemove={(file) => handleRemove(file,"slider")}
                                >
                                    <div>
                                        {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>

                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal>
            <Modal
                open={previewOpen}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
                width={800}
                title={previewTitle}
            >
                <img src={previewImage}  alt="Exam" style={{ width: "100%", height: "100%" }} />
            </Modal>

        </>
    )
}

export default BookModalCreate