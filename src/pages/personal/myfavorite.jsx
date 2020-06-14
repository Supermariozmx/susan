import React, { Component } from 'react'
import { Card, Icon, Button, Table, Avatar } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqPersonalFavorites } from "../../api/index";
import "./personal.less"

// const Item = List.Item



class PersonalFavorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteData: []
        }
    }
    componentDidMount() {
        const { user } = this.props;
        const userId = user._id;
        reqPersonalFavorites(userId).then((res) => {
            console.log("req favorite data----------", res.data);
            // console.log("req favorite products", res.data.products)
            let favoriteProducts
            if (res.data) {
                if (res.data.products) {
                    favoriteProducts = res.data.products
                } else {
                    favoriteProducts = []
                }
            } else {
                favoriteProducts = []
            }
            this.setState({ favoriteData: favoriteProducts })
        })
    }

    componentWillMount() {
        this.initColumns()
    }

    showDetail = (item) => {
        this.props.history.push({ pathname: `/main/detail/${item._id}`, state: { item } });
    }

    initColumns = () => {
        this.columns = [
            {
                title: '',
                render: (product) => {
                    return (
                        <Avatar shape="circle" size={48} src={BASE_IMG_URL + product.imgs[0]} />
                    )
                }
            },
            {
                title: '',
                dataIndex: 'name',
            },
            {
                title: '',
                dataIndex: 'price',
            },
            {
                title: '',
                dataIndex: 'quantity',
                render: (quantity) => '库存' + quantity + '件'  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                title: '',
                dataIndex: 'price',
                render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
            },

            {
                width: 100,
                title: '',
                render: (product) => {
                    return (
                        <span>
                            {/*将order对象使用state传递给目标路由组件*/}
                            <Button type="dashed" onClick={() => this.showDetail(product)}>详情</Button>
                        </span>
                    )
                }
            },
        ];
    }

    render() {
        const { favoriteData } = this.state;
        const title = (
            <span>
                <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{ marginRight: 10, fontSize: 20 }}
                        onClick={() => this.props.history.goBack()}
                    />
                </LinkButton>

                <span>我的收藏</span>
            </span>
        )
        return (
            <Card title={title} className='personal-favorite'>
                <Table
                    showHeader={false}
                    bordered={false}
                    rowKey='_id'
                    // loading={loading}
                    dataSource={favoriteData}
                    columns={this.columns}
                    pagination={false}
                // pagination={{
                //     current: this.pageNum,
                //     total,
                //     defaultPageSize: PAGE_SIZE,
                //     showQuickJumper: true,
                //     onChange: this.getOrders
                // }}
                />
            </Card>
        )
    }
}

export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    {}
)(withRouter(PersonalFavorite))