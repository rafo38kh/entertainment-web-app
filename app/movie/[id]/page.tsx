import ShowAndMovie from "@/components/ShowAndMovie";

type Params = {
  params: {
    id: string;
  };
};

export default function MoviePage({ params }: Params) {
  return (
    <>
      <ShowAndMovie movieId={params?.id} />
    </>
  );
}
