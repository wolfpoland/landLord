export type CardPageProps = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function CardPage(props: CardPageProps) {
  const { children, title } = props;

  return (
    <div className="container bg-base-100 w-full mx-auto flex align-center justify-center">
      <div className="mt-52 mb-20 relative w-full h-fit card bg-neutral-content shadow-xl">
        <h1 className="-top-12 left-10 card-title absolute text-3xl mb-10">
          {title}
        </h1>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}
