import * as yup from 'yup';
import { FC } from 'react';
import { Modal, ModalProps, Space } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import usePostStore from '../hooks/usePostStore';
import TextField from '../components/TextField';

interface Props extends ModalProps {}

export const validationSchema = yup.object().shape({
   title: yup.string().required('Title field is a required'),
   description: yup.string().required('Description field is a required'),
});

export const defaultValues = {
   title: '',
   description: '',
};

const AddPostModal: FC<Props> = ({ open, onOk, onCancel, ...modalProps }) => {
   const addPost = usePostStore(state => state.addPost);

   const { control, handleSubmit, reset, setFocus, formState } = useForm({
      defaultValues,
      resolver: yupResolver(validationSchema),
   });

   return (
      <Modal
         title='Add post'
         closable={false}
         open={open}
         okText='Add'
         okButtonProps={{
            disabled: !formState.isDirty,
         }}
         onOk={e =>
            handleSubmit(validateValues => {
               addPost(validateValues);
               onOk?.(e);
            })(e)
         }
         onCancel={onCancel}
         afterClose={() => reset(defaultValues)}
         afterOpenChange={open => {
            if (open) {
               setFocus('title');
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

export default AddPostModal;
