
import { InboxOutlined } from "@ant-design/icons"
import { message, Modal, Table, Upload } from "antd"
import { useState } from "react";
import * as XLSX from 'xlsx';
const { Dragger } = Upload;
const UserImport = (props) => {
    const { isOpenModalImport, setIsOpenModalImport } = props
    const [dataExcel,setDataExcel] = useState()

    const cancelModalImport = () => {
        setIsOpenModalImport(false)
    }

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
        // https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv

        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // Không gửi action lên server
        customRequest: dummyRequest,
        onChange(info) {
            console.log(info);
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                //read XLSX and convert this to json
                if(info.fileList && info.fileList.length > 0){
                    const file = info.fileList[0].originFileObj;
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(file); //read file with type ArrayBuffer(binary)
                    reader.onload = function(e) {
                        const data = new Uint8Array(reader.result); //Data of arraybuffer
                        const workbook = XLSX.read(data, {type: 'array'});
                        // find the name of your sheet in the workbook first
                        const sheet = workbook.Sheets['Sheet1'];
                
                        // convert to json format
                        const json = XLSX.utils.sheet_to_json(sheet,{
                            header:["fullName","email","phone"], //defind header for column  in a sheet * should have
                            range:1 //Skip header row
                        });
                        if(json && json.length > 0) setDataExcel(json)
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
            width={700}
            open={isOpenModalImport}
            onCancel={cancelModalImport}>
            <Dragger {...propsUpload}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
            <Table style={{marginTop:30}}
            dataSource={dataExcel}
                columns={[
                    {
                      title: 'Full Name',
                      dataIndex: 'fullName',
                    },
                    {
                      title: 'Email',
                      dataIndex: 'email',
                    },
                    {
                      title: 'Phone',
                      dataIndex: 'phone',
                    },
                  ]}
            />
        </Modal>
    )
}

export default UserImport