import React, { useRef, useState } from 'react'
import { Col, Divider, Rate, Row } from "antd";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";
import ModalGallery from './ModalGallery';
import './book.scss'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from 'react-icons/bs';

const ViewDetail = () => {
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const refGallery = useRef(null);
    const images = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"

        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"

        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
    ];

    const handleOnClickImage = () => {
        setIsOpenModalGallery(true)
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
    }
    return (
            <div style={{ background: '#efefef', padding: "20px 0" }}>
                <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto' }}>
                    <div style={{ background: "#fff", padding: "20px", borderRadius: 5 }}>
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
                                    <div className='title'>How Psychology Works - Hiểu Hết Về Tâm Lý Học</div>
                                    <div className='author'>Tác giả: Jo Hemmings</div>
                                    <div className='rating'>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                        <Divider type="vertical" />
                                        <div className='sold-cus'>
                                            <div className='sold'>6969</div>
                                            <div >Đã bán </div>
                                        </div>
                                    </div>
                                    <div className='price'>
                                        <span className='currency'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(696966666)}
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
                                            <button ><MinusOutlined /></button>
                                            <input defaultValue={1} />
                                            <button><PlusOutlined /></button>
                                        </span>
                                    </div>
                                    <div className='buy'>
                                        <button className='cart'>
                                            <BsCartPlus className='icon-cart' />
                                            <span>Thêm vào giỏ hàng</span>
                                        </button>
                                        <button className='now'>Mua ngay</button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
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