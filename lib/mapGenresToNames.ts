// export default function mapGenresToNames(
//   nestedArrays: number[],
//   genres: {
//     id: number;
//     name: string;
//   }
// ) {
//   return nestedArrays?.map((subArray) => {
//     return subArray?.map((id) => {
//       const matchingGenre = genres?.find((genre) => genre?.id === id);
//       return matchingGenre ? { id, genreName: matchingGenre.name } : null;
//     });
//   });
// }
