
export default function(props: { children: React.ReactNode }) {
    return (
        <div className="my-block d-flex justify-content-center w-100" style={{ height: '100vh' }}>{props.children}</div>
    )
}
