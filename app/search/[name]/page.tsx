import SearchPage from "@/components/SearchPage";

type Params = {
  params: {
    value: string;
  };
};

export default function Page({ params }: Params) {
  return <SearchPage searchValue={params?.value} />;
}
