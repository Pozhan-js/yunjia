export default function Button(props) {
    return (
        <button
            onClick={props.onClick}
            disabled={props?.disabled}
            className={`border-2 flex px-3 py-2 transform-gpu items-center justify-center rounded-full bg-black bg-opacity-20 text-base font-medium text-white transition hover:scale-105 hover:bg-opacity-30 focus:outline-none active:bg-opacity-40 `+props?.className}
        >
            <span>{props?.children}</span>
        </button>
    )
}
