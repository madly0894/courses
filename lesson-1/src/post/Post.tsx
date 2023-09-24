import React, { FC, useState } from 'react';
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import usePostStore from '../hooks/usePostStore';
import AddPostModal from '../modals/AddPostModal';
import EditPostModal from '../modals/EditPostModal';
import DeletePostModal from '../modals/DeletePostModal';

const Post: FC = () => {
   const posts = usePostStore(state => state.posts);

   const [isAddPostModal, setIsAddPostModal] = useState<boolean>(false);
   const [isEditPostModal, setIsEditModal] = useState<boolean | number>(false);
   const [isDeletePostModal, setIsDeletePostModal] = useState<boolean | number>(false);

   return (
      <>
         <Table
            title={() => (
               <Button icon={<PlusOutlined />} onClick={() => setIsAddPostModal(true)}>
                  Add row
               </Button>
            )}
            size='small'
            bordered
            pagination={false}
            dataSource={posts}
            onRow={(data, index) => ({
               onClick: () => setIsEditModal(data.id),
               style: {
                  cursor: 'pointer',
               },
            })}
            columns={[
               {
                  title: '#id',
                  dataIndex: 'id',
                  width: 80,
                  sorter: (a, b) => a.id - b.id,
               },
               {
                  title: 'Title',
                  dataIndex: 'title',
                  sorter: (a, b) => b.title.localeCompare(a.title),
               },
               {
                  title: 'Description',
                  dataIndex: 'description',
                  sorter: (a, b) => b.description.localeCompare(a.description),
               },
               {
                  title: 'Action',
                  fixed: 'right',
                  width: 150,
                  render: (value, record, index) => (
                     <Space>
                        <Button
                           type='link'
                           icon={<EditOutlined />}
                           onClick={e => {
                              e.stopPropagation();
                              setIsEditModal(record.id);
                           }}
                        >
                           Edit
                        </Button>
                        <Button
                           type='link'
                           danger
                           icon={<DeleteOutlined />}
                           onClick={e => {
                              e.stopPropagation();
                              setIsDeletePostModal(record.id);
                           }}
                        >
                           Delete
                        </Button>
                     </Space>
                  ),
               },
            ]}
         />
         <AddPostModal
            open={isAddPostModal}
            onOk={() => setIsAddPostModal(false)}
            onCancel={() => setIsAddPostModal(false)}
         />
         <EditPostModal
            open={isEditPostModal}
            onOk={() => setIsEditModal(false)}
            onCancel={() => setIsEditModal(false)}
         />
         <DeletePostModal
            open={isDeletePostModal}
            onOk={() => setIsDeletePostModal(false)}
            onCancel={() => setIsDeletePostModal(false)}
         />
      </>
   );
};

export default Post;
