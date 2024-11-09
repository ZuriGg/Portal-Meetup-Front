import useFetch from "./useFetch";

export const meetupEntriesFetch = (formData) => {
    return useFetch("http://localhost:3000/meetupentries", {
        method: "POST",
        body: JSON.stringify(formData),
    });
};
