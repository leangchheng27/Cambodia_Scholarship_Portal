import Map from '../../../../assets/University/CambodiaMap.png';

export default function CambodiaMap() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <img src={Map} alt="Cambodia Map" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
    );
}