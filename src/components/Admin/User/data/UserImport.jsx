
import { InboxOutlined } from "@ant-design/icons"
import { message, Modal, notification, Table, Upload } from "antd"
import { useState } from "react";
import * as XLSX from 'xlsx';
import { callImportUser } from "../../../../services/api";
import TemplPlateFile from './sampleTemplate.xlsx?url';

const { Dragger } = Upload;
const UserImport = (props) => {
    const { isOpenModalImport, setIsOpenModalImport } = props
    const [dataExcel, setDataExcel] = useState()

    const handleImport = async () => {
        const data = dataExcel.map((item) => {
            item.password = "123456"
            return item
        })
        const res = await callImportUser(data)
        if (res && res.data) {
            notification.success({
                description: `Success: ${res.data.countSuccess},Error:${res.data.countError}`,
                message: "Upload thành công"
            })
            setDataExcel([])
            setIsOpenModalImport(false)
            props.fetchUser();
        }
        else {
            notification.error({
                description: res.message,
                message: "Đã có lỗi xảy ra"
            })

        }
    }
    //Set fake action send data To server because don't need it
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };

    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // Không gửi action lên server
        customRequest: dummyRequest,
        onChange(info) {
            // console.log(info);
            const { status } = info.file;
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                //read XLSX and convert this to json
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(file); //read file with type ArrayBuffer(binary)
                    reader.onload = function (e) {
                        const data = new Uint8Array(reader.result); //Data of arraybuffer
                        const workbook = XLSX.read(data, { type: 'array' });
                        // find the name of your sheet in the workbook first
                        const sheet = workbook.Sheets['Sheet1'];

                        // convert to json format
                        const json = XLSX.utils.sheet_to_json(sheet, {
                            header: ["fullName", "email", "phone"], //defind header for column  in a sheet * should have
                            range: 1 //Skip header row
                        });
                        if (json && json.length > 0) setDataExcel(json)
                    };
                }
                message.success(`${info.file.name} file uploaded successfully.`);

            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Modal title="Basic Modal"
            width={800}
            okText="Import Data"
            open={isOpenModalImport}
            onCancel={() => {
                setIsOpenModalImport(false);
                setDataExcel([]);
            }}
            maskClosable={false}
            onOk={() => handleImport()}
            okButtonProps={{
                // disabled: dataExcel.length < 1
            }}
        >
            <Dragger {...propsUpload}
                // showUploadList={dataExcel.length > 0 ? true : false}
            >
                <p className="ant-upload-drag-icon" >
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                    <a
                        style={{
                            color: '#1890ff',
                            textDecoration: 'underline',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            padding:"0 5px"
                        }}
                        onClick={(e) => e.stopPropagation()}
                        href={TemplPlateFile}
                        download >
                        Download Sample file
                    </a>
                </p>
            </Dragger>
            <Table style={{ marginTop: 30 }}
                dataSource={dataExcel}
                columns={[
                    {
                        title: 'Full Name',
                        dataIndex: 'fullName',
                        key: "fullName"
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: "email"
                    },
                    {
                        title: 'Phone',
                        dataIndex: 'phone',
                        key: "phone"
                    },
                ]}
            />
        </Modal>
    )
}

export default UserImport