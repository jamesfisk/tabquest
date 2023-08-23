

export default function Slab(props: React.PropsWithChildren<{}>) {
    return (
        <main className={`flex flex-col pt-28 md:px-20 items-center`}>
            <div id="slab" className="block lg:w-1/2 sm:w-5/6 w-full max-w-xl p-2 md:p-8 bg-slate-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {props.children}
            </div>
        </main>
    );
}