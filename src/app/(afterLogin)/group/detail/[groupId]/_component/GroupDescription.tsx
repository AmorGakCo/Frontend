const GroupDescription = ({description}: {description: string}) => {
  return (
    <div>
      <div>모임 설명</div>
      <div className="pt-3 pb-6">{description}</div>
    </div>
  );
};
export default GroupDescription;
