import { Drawer } from "antd";
import Lottie from "lottie-react";
import loading from "../Json/loading.json";

// import heartLoading from "../images/heart.json";

const Loading = (props) => {
  const { enableLoading } = props;
  // const { heart } = this.props;
  const style = {
    //   height: 210,
    color: "#fc572b",
    //   marginTop: "25px",
  };

  // const heartStyle = {
  //   height: 200,
  //   marginTop: "20px",
  // };

  return (
    <div>
      {/* {heart ? (
          <Drawer
            className="background-transparent"
            visible={enableLoading}
            closable={false}
            placement="top"
            width="100%"
            height="100%"
            size="large"
            style={{ backgroundColor: "transparent" }}
          >
            <div
              style={{
                width: "240px",
                height: "240px",
                backgroundColor: "#fcc9d1",
                borderRadius: "50%",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: "auto",
              }}
            >
              <Lottie animationData={heartLoading} style={heartStyle} />
            </div>
          </Drawer>
        ) : ( */}
      <Drawer
        className="background-transparent"
        visible={enableLoading}
        closable={false}
        placement="top"
        width="100%"
        height="100%"
        size="large"
        style={{ backgroundColor: "transparent" }}
      >
        <div
          style={{
            width: "240px",
            height: "240px",
            // backgroundColor: "#00000073",
            borderRadius: "50%",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
          }}
        >
          <Lottie animationData={loading} style={style} />
          {/* <h2 style={{ color: "#fc572b", textAlign: "center" }}>
              Please wait...
            </h2> */}
        </div>
      </Drawer>
      {/* )} */}
    </div>
  );
};
export default Loading;
