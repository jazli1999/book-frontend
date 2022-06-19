import { Badge } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import WhiteTick from '../../../assets/images/white_tick.svg';

function getBadge(icon) {
  const containerStyle = {
    background: '#658e49',
    width: '20px',
    height: '20px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  };
  return (
    <span style={containerStyle}>
      {icon}
    </span>
  );
}

function MarkableCover(props) {
  const badgeIconStyle = {
    color: 'white',
    fontSize: '8pt',
  };

  const badges = {
    isFavorite: <HeartFilled style={badgeIconStyle} />,
    isAvailable: <img alt="is available" src={WhiteTick} style={{ width: '12px', marginTop: '1px' }} />,
  };

  const cover = <img alt="cover" src={props.src} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />;
  if (props.mark) {
    return (
      <Badge count={getBadge(badges[props.mark])} offset={[-5, 5]}>
        {cover}
      </Badge>
    );
  }
  return cover;
}

export default MarkableCover;
