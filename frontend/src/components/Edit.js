import { IconButton, ButtonToolbar } from 'rsuite';
import { MoreOutlined } from '@ant-design/icons';

ReactDOM.render(
  <>
    <ButtonToolbar>
      <IconButton icon={<MoreOutlined/>}>Add</IconButton>
    </ButtonToolbar>
  </>,
  document.getElementById('root')
);