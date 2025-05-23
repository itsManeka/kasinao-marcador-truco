export default function PointButton({ label, onClick, className }: { label: string, onClick: () => void, className: string }) {
    return <button className={className} onClick={onClick}>{label}</button>;
}