import React, { useEffect, useRef, useState } from 'react'
import { Col, Divider, Rate, Row } from "antd";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";
import ModalGallery from './ModalGallery';
import './book.scss'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from 'react-icons/bs';
import BookLoader from './BookLoader';
import { useLocation, useParams } from 'react-router-dom';
import { callGetDetailBook } from '../../services/api';
import { useDispatch } from 'react-redux';
import { doAddBookAction } from '../../redux/order/orderSlice';

const ViewDetail = (props) => {
    const { dataBook } = props
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(1);

    const dispatch = useDispatch()
    const refGallery = useRef(null);

    const images = dataBook?.items ?? []

    //handle Image When click this
    const handleOnClickImage = () => {
        setIsOpenModalGallery(true)
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
    }
    const handleChangeButton = (type) => {
        if(type === "MINUS") {
           if(currentQuantity - 1 <= 0 ) return; 
           setCurrentQuantity(currentQuantity - 1)
        }
        if(type === "PLUS"){
            if(currentQuantity === +dataBook.quantity) return ; //Max quantity
            setCurrentQuantity(currentQuantity + 1)
        }
    }
    const handleChangeInput = (value) => {
        const numberValue = Number(value)
        console.log(numberValue);
        
        if(!isNaN(value)) {
            if(+value > 0 && +value < +dataBook.quantity){
                setCurrentQuantity(+value)
            }
        } 
        // if(!isNaN(numberValue) && numberValue > 0 && numberValue < Number(dataBook.quantity)){
        //     setCurrentQuantity(numberValue)
        // }
        // if(!isNaN(numberValue) && numberValue > Number(dataBook.quantity))
        // {
        //     setCurrentQuantity(dataBook.quantity)
        // }
    }
    const handleAddToCart = (quantity,book) => {
        dispatch(doAddBookAction({quantity,detail:book,_id:book._id}))
    }
    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ background: "#fff", padding: "20px", borderRadius: 5 }}>
                    {
                        dataBook && dataBook._id ?
                            <Row gutter={[20, 20]}>
                                <Col md={10} sm={0} xs={0}>
                                    <ImageGallery
                                        ref={refGallery}
                                        items={images}
                                        showPlayButton={false} //hide play button
                                        showFullscreenButton={false} //hide fullscreen button
                                        renderLeftNav={() => <></>} //left arrow === <> </>
                                        renderRightNav={() => <></>}//right arrow === <> </>
                                        slideOnThumbnailOver={true}  //onHover => auto scroll images
                                        onClick={() => handleOnClickImage()}
                                    />
                                </Col>
                                <Col md={14} sm={24}>
                                    {/* Mobile Image Gallery */}
                                    <Col md={0} sm={24} xs={24}>
                                        <ImageGallery
                                            ref={refGallery}
                                            items={images}
                                            showPlayButton={false} //hide play button
                                            showFullscreenButton={false} //hide fullscreen button
                                            renderLeftNav={() => <></>} //left arrow === <> </>
                                            renderRightNav={() => <></>}//right arrow === <> </>
                                            showThumbnails={false}
                                        />
                                    </Col>
                                    {/* Mobile Image Gallery */}

                                    <Col span={24}>
                                        <div className='title'>{dataBook?.mainText}</div>
                                        <div className='author'>Tác giả: <span>{dataBook?.author}</span></div>
                                        <div className='rating'>
                                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                            <Divider type="vertical" />
                                            <div className='sold-cus'>
                                                <div className='sold'>{dataBook?.sold}</div>
                                                <div >Đã bán </div>
                                            </div>
                                        </div>
                                        <div className='price'>
                                            <span className='currency'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((dataBook?.price ?? 0))}
                                            </span>
                                        </div>
                                        <div className='delivery'>
                                            <div>
                                                <span className='left-deli'>Vận chuyển</span>
                                                <span className='right-deli'>Miễn phí vận chuyển</span>
                                            </div>
                                        </div>
                                        <div className='quantity'>
                                            <span className='left-quantity'>Số lượng</span>
                                            <span className='right-quantity'>
                                                <button onClick={() => handleChangeButton("MINUS")}>
                                                    <MinusOutlined />
                                                </button>
                                                <input  onChange={(e) => handleChangeInput(e.target.value)} value={currentQuantity}/>
                                                <button onClick={() => handleChangeButton("PLUS")}>
                                                    <PlusOutlined />
                                                </button>
                                            </span>
                                            <span className='quantity-current'>{dataBook?.quantity} sản phẩm có sẵn</span>
                                        </div>
                                        <div className='buy'>
                                            <button className='cart' onClick={() => handleAddToCart(currentQuantity,dataBook)}>
                                                <BsCartPlus className='icon-cart' />
                                                <span >Thêm vào giỏ hàng</span>
                                            </button>
                                            <button className='now'>Mua ngay</button>
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                            :
                            <BookLoader />
                    }
                </div>
            </div>
            <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={images}
                title={"hardcode"}
            />
        </div>

    )
}

export default ViewDetail