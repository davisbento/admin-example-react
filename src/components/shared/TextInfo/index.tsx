import Text from 'antd/lib/typography/Text';
import { memo } from 'react';

interface IProps {
  title: string;
  text?: string;
  content?: React.ReactNode;
}

const TextInfo = memo(({ title, text, content }: IProps) => {
  return (
    <div>
      <Text className='text-header'>{title}: </Text>
      {text && <Text className='text-info'>{text}</Text>}
      {content && content}

      <div className='mt-6' />
    </div>
  );
});

export default TextInfo;
