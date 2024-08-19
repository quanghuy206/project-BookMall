import React, { useEffect, useRef, useState } from 'react'
import { Breadcrumb, Col, Divider, Rate, Row } from "antd";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";
import ModalGallery from './ModalGallery';
import './book.scss'
import { HomeOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from 'react-icons/bs';
import BookLoader from './BookLoader';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { callGetDetailBook } from '../../services/api';
import { useDispatch } from 'react-redux';
import { doAddBookAction } from '../../redux/order/orderSlice';

const ViewDetail = (props) => {
    const { dataBook } = props
    const navigate = useNavigate()
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(1);
    console.log(dataBook);

    const dispatch = useDispatch()
    const refGallery = useRef(null);

    const images = dataBook?.items ?? []

    //handle Image When click this
    const handleOnClickImage = () => {
        setIsOpenModalGallery(true)
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
    }
    const handleChangeButton = (type) => {
        if (type === "MINUS") {
            if (currentQuantity - 1 <= 0) return;
            setCurrentQuantity(currentQuantity - 1)
        }
        if (type === "PLUS") {
            if (currentQuantity === +dataBook.quantity) return; //Max quantity
            setCurrentQuantity(currentQuantity + 1)
        }
    }
    const handleChangeInput = (value) => {
        const numberValue = Number(value)
        console.log(numberValue);

        if (!isNaN(value)) {
            if (+value > 0 && +value < +dataBook.quantity) {
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
    const handleAddToCart = (quantity, book) => {
        dispatch(doAddBookAction({ quantity, detail: book, _id: book._id }))
    }

    const handleBuyNow = (quantity, book) => {
        dispatch(doAddBookAction({ quantity, detail: book, _id: book._id }))
        navigate("/order")
    }
    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Breadcrumb
                    style={{ margin: '5px 0' }}
                    items={[
                        {
                            // href: '#',
                            title: <HomeOutlined />,
                        },
                        {
                            title: (
                                <Link to={'/'}  style={{ textDecoration: "underline",cursor:"pointer" }}>
                                    <span>Trang Chủ</span>
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <div>
                                    {dataBook?.category}
                                </div>
                            )
                        }
                    ]}
                />
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
                                                <input onChange={(e) => handleChangeInput(e.target.value)} value={currentQuantity} />
                                                <button onClick={() => handleChangeButton("PLUS")}>
                                                    <PlusOutlined />
                                                </button>
                                            </span>
                                            <span className='quantity-current'>{dataBook?.quantity} sản phẩm có sẵn</span>
                                        </div>
                                        <div className='buy'>
                                            <button className='cart' onClick={() => handleAddToCart(currentQuantity, dataBook)}>
                                                <BsCartPlus className='icon-cart' />
                                                <span >Thêm vào giỏ hàng</span>
                                            </button>
                                            <button onClick={() => handleBuyNow(currentQuantity, dataBook)} className='now'>Mua ngay</button>
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                            :
                            <BookLoader />
                    }
                </div>
                <Divider />
                <div className='detail-book-content'>
                    <div className='detail-product'>
                        <h1 >Chi tiết sản phẩm</h1>
                        <div className='list-content-detail'>
                            <div className='item-content'>
                                <label>Danh mục  </label>
                                <div>{dataBook?.category}</div>
                            </div>
                            <div  >
                                <label>Kho</label>
                                <div>952541</div>
                            </div>
                            <div >
                                <label>Ngôn ngữ</label>
                                <div> Tiếng Việt</div>
                            </div>
                            <div >
                                <label>Địa chỉ tổ chức chịu trách nhiệm sản xuất</label>
                                <div> Đang cập nhật</div>
                            </div>
                            <div >
                                <label>Tên sách</label>
                                <div> {dataBook?.mainText}</div>
                            </div>
                            <div >
                                <label>Tác giả</label>
                                <div> {dataBook?.author}</div>
                            </div>
                            <div >
                                <label>Giá</label>
                                <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((dataBook?.price ?? 0))}
                                </div>
                            </div>
                            <div >
                                <label>Số lượng còn</label>
                                <div> {dataBook?.quantity}</div>
                            </div>
                        </div>
                    </div>
                    <div className='descript-product'>
                        <h1> Mô tả sản phẩm</h1>
                        <div className='des-item'>
                            <div >
                                <label>Tên sách:</label>
                                <div> {dataBook?.mainText}</div>
                            </div>
                            <div >
                                <label>Tác giả:</label>
                                <div> {dataBook?.author}</div>
                            </div>
                            <div className='item-content'>
                                <label>Thể loại:  </label>
                                <div>{dataBook?.category}</div>
                            </div>

                            <div >
                                <label>Giá:</label>
                                <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((dataBook?.price ?? 0))}
                                </div>
                            </div>
                            <div >
                                <label>Số trang:</label>
                                <div> 658</div>
                            </div>
                            <div >
                                <label>Khổ:</label>
                                <div> 14.5x20.5 (cm)</div>
                            </div>
                        </div>
                        <Divider />
                        <img
                            className='image-des'
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook?.thumbnail}`}
                            alt="thumbnail book" />

                        <p>NGHĨ GIÀU VÀ LÀM GIÀU

                            Nghĩ giàu & làm giàu được viết bởi Napoleon Hill - một “cố vấn” đáng tin cậy đã thay đổi cuộc đời của hàng triệu người. Trong một cuộc gặp cơ duyên với Andrew Carnegie - Ông vua thép nước Mỹ, cuộc đời của chàng trai nghèo Napoleon Hill đã có một bước thay đổi quan trọng. Từ đây, ông bắt đầu bước trên con đường với vai trò một người trợ giúp và định hướng cho những ai muốn thành công, những ai đang gặp thất bại hoặc tuyệt vọng.

                            Nghĩ giàu & làm giàu là cuốn sách dạy chúng ta cách “suy nghĩ”. Vật chất quyết định ý thức nhưng đồng thời để có được kết quả thực tế, chúng ta phải tạo ra những năng lượng từ ý nghĩ để thúc đẩy hành vi hoàn thiện vật chất mong muốn.

                            “Cuộc đời là một ván cờ, và người chơi đối diện với bạn chính là thời gian. Nếu bạn do dự trước khi di chuyển, hoặc không di chuyển kịp thời, thời gian sẽ loại bỏ bạn khỏi cuộc đua. Bạn đang bắt tay với một đối tác không khoan dung và chờ đợi để bạn lựa chọn!”. Nếu bạn còn do dự, bạn sẽ mau chóng bị hất khỏi đường đua để đến với thành công. Làm giàu không đến từ may mắn, nó đến chính những sức mạnh nội tại được bạn thu gom từ những suy nghĩ, ý tưởng nảy sinh trong đầu với một khao khát mãnh liệt và kiên trì bền bỉ. Khi cầm cuốn sách Nghĩ giàu & làm giàu trên tay, bạn sẽ được dạy cách điều khiển và vận dụng món quà trời ban ấy một cách tốt nhất để khai thác “mỏ vàng” cuộc sống.



                            CHIẾN THẮNG CON QUỶ TRONG BẠN - GIỚI THIỆU



                            Quý ngày Ác quỷ có một lời mời gửi đến bạn! Nếu một ngày, Ác quỷ mời bạn tham dự tiệc trà cùng nó, bạn sẽ làm gì? Kiêu hãnh tới đó và tự tin rằng ta chẳng phải sợ phần Ác nào đang đe dọa. Hay nhút nhát, rụt rè mà cúi đầu để nghe những chỉ thị mà nó buộc bạn làm theo?

                            Chiến thắng con quỷ trong bạn - cuốn sách của Napoleon Hill sẽ mang đến cho bạn một trải nghiệm khác biệt về việc đối diện, đấu trí đấu dũng và chiến thắng phần “Con” luôn hăm hở thống trị phần “Người” ấy.

                            Không ai sống trong một Thiên đường với một Thiên thần duy nhất, giống như vạn vật có hai thái cực âm dương, trong con người luôn tồn tại song song Thiên thần và Ác quỷ. Thiên thần là thứ ánh sáng dẫn đường bạn đến những phước lành, những hành vi tốt, những đạo đức đáng ngưỡng mộ. Nhưng Ác quỷ - một bản thể đầy cám dỗ không bao giờ chịu thua, lúc nào cũng chờ đợi một lỗ hổng trong kết giới ý chí để xâm chiếm mảnh đất tâm thức và thao túng bạn.

                            Napoleon Hill sẽ dẫn bạn đi vào vùng tối sâu thẳm của tâm thức, nơi những cuộc thú tội sẽ diễn ra, nơi Quý ngài Ác quỷ hả hê vì những trò tiêu khiển như buộc một con người trở nên yếu hèn và mê hoặc, cám dỗ bằng sự lười biếng, sự cuồng tín. Nhưng cũng từ trong cuộc đối thoại với cái ác, Napoleon Hill tiết lộ cho bạn biết bạn phải vận dụng nghịch cảnh như thế nào, xây dựng kỷ luật tự nhân và các đức tính quan trọng để làm chủ tốt bản thân mình.

                            Những con người buông thả là những con người cho phép mình bị ảnh hưởng và điều khiển bởi những hoàn cảnh bên ngoài tâm trí của họ. Đó là lời của Quý ngài Ác quỷ. Nếu không muốn bị Quý ngài này xâm chiếm cuộc sống của bạn suốt khoảng thời gian tồn tại trên đời, bạn cần phải bước vào cuộc chiến thực sự với phần “Con” của bản thân, dựa trên những hướng dẫn hữu ích từ Napoleon Hill.</p>
                    </div>
                </div>
            </div>

            <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={images}
                title={dataBook?.mainText}
            />
        </div>

    )
}

export default ViewDetail