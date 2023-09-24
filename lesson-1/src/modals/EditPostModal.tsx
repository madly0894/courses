import { FC } from 'react';
import { Modal, ModalProps, Space } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import usePostStore from '../hooks/usePostStore';
import TextField from '../components/TextField';
import { defaultValues, validationSchema } from './AddPostModal';

interface Props extends Omit<ModalProps, 'open'> {
   open: boolean | number;
}

const EditPostModal: FC<Props> = ({ open, onOk, onCancel, ...modalProps }) => {
   const updatePost = usePostStore(state => state.updatePost);
   const selectedPost = usePostStore(state => state.posts.find(item => item.id === +open));

   const { control, handleSubmit, reset, setFocus, formState } = useForm({
      defaultValues,
      resolver: yupResolver(validationSchema),
   });

   return (
      <Modal
         title='Edit post'
         closable={false}
         open={!!open}
         okText='Edit'
         onOk={e =>
            handleSubmit(validateValues => {
               updatePost({ id: +open, ...validateValues });
               onOk?.(e);
            })(e)
         }
         okButtonProps={{
            disabled: !formState.isDirty,
         }}
         onCancel={onCancel}
         afterClose={() => reset(defaultValues)}
         afterOpenChange={open => {
            if (open) {
               setFocus('title');
               reset({
                  title: selectedPost?.title,
                  description: selectedPost?.description,
               });
            }
         }}
         {...modalProps}
      >
         <Space direction='vertical' style={{ width: '100%' }}>
            <TextField control={control} name='title' placeholder='Title' />
            <TextField control={control} name='description' placeholder='Description' />
         </Space>
      </Modal>
   );
};

export default EditPostModal;
