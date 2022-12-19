export type CardPageProps = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function CardPage(props: CardPageProps) {
  const { children, title } = props;

  return (
    <div className="container bg-base-100 w-full mx-auto flex align-center justify-center">
      <div className="my-5 w-full h-fit card bg-neutral-content shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl mb-10">{title}</h1>

          {children}
        </div>
      </div>
    </div>
  );
}
