import "./youtubeembed.scss";

const YoutubeEmbed = () => {
  return (
    <div className="youtube">
      <iframe
        className="youtube__iframe"
        src={`https://www.youtube.com/embed/VB1XuRfYSwg?si=uY0rUSVv-031q4sb`}
        title="YouTube video player"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

export default YoutubeEmbed;
