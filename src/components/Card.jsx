
// eslint-disable-next-line react/prop-types
const Card = ({ children, isOpen, showShadow }) => {
    
    if (!isOpen){
        return null
    }
  return (
    <>
        {showShadow && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: '999',
            }} />
        )}
        <div className="card" style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '480px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            zIndex: '1000',
        }}>
            {children}
        </div>
    </>
  )
}

export default Card
