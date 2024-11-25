import './FAB.css'
export const FAB = ({onClick}) => {
  return (
    <div className="fab" onClick={() => onClick()}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <mask id="mask0_80_567" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
          <rect width="32" height="32" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_80_567)">
          <path d="M14.6665 17.3333H6.6665V14.6666H14.6665V6.66663H17.3332V14.6666H25.3332V17.3333H17.3332V25.3333H14.6665V17.3333Z" fill="white"/>
        </g>
      </svg>
    </div>
  )
}