import { FC } from 'react';
import { Control, useController } from 'react-hook-form';
import { Input, InputProps, Tooltip } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

interface Props extends InputProps {
   control: Control<any>;
   name: string;
}

const TextField: FC<Props> = ({ control, name, defaultValue = '', ...inputProps }) => {
   const { field, fieldState, formState } = useController({
      control,
      name,
      defaultValue,
   });

   return (
      <Input
         {...field}
         status={fieldState.error && 'error'}
         suffix={
            fieldState.error ? (
               <Tooltip title={fieldState.error.message}>
                  <CloseCircleOutlined />
               </Tooltip>
            ) : (
               <span />
            )
         }
         {...inputProps}
      />
   );
};

export default TextField;
