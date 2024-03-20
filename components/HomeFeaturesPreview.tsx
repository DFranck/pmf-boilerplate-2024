import { ThreeDCard } from "./ThreeDCard";

const HomeFeaturesPreview = () => {
  return (
    <>
      <ThreeDCard
        imgSrc={
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        title={"Card 1"}
        description={"Card 1 description"}
        about={"https://about-feature1"}
        page={"https://page-feature1"}
      />
      <ThreeDCard
        imgSrc={
          "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        title={"Card 2"}
        description={"Card 2 description"}
        about={"https://about-feature2"}
        page={"https://page-feature2"}
      />
    </>
  );
};

export default HomeFeaturesPreview;
