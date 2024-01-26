import ShowAndMovie from "@/components/ShowAndMovie";

type Params = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Params) {
  return (
    <>
      <ShowAndMovie movieId={params?.id} />
    </>
  );
}
