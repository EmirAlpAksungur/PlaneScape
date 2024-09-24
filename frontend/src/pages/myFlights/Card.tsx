import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import SchipholService from "../../services/api/schiphol";
import AirlinesIcon from "@mui/icons-material/Airlines";
import { MyDialog } from "../../components";
import Details from "../booking/left/content/Details";
import "swiper/css";
import "swiper/css/autoplay";
const boxData = [
  { price: "$156", label: "Main" },
  { price: "$182", label: "Economy" },
  { price: "$200", label: "Economy Flexible" },
  { price: "$204", label: "Comfort+" },
  { price: "$386", label: "Delta One" },
];
const PriceBox: React.FC<{ price: string; label: string }> = ({
  price,
  label,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ":hover": {
          cursor: "pointer",
          boxShadow: 2,
        },
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "8px",
          padding: "8px",
        }}
      >
        <Typography variant="h6">{price}</Typography>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};
const MyCard: React.FC<{ id: string }> = ({ id }) => {
  const [data, setData] = React.useState<any>({});

  const loadData = async () => {
    try {
      let res = await SchipholService.getFlight(id);
      console.log(res);

      setData(res.data);
    } catch (err) {}
  };

  React.useEffect(() => {
    loadData();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <Grid container className="my-flights__card">
      <Grid item xs={6} sx={{ display: "flex", gap: 1, pr: 1 }}>
        <Box sx={{ height: "100%", display: "inline-block" }}>
          <AirlinesIcon fontSize="large" />
        </Box>
        <Box sx={{ width: "100%" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: "1.6rem",
              paddingBottom: "8px",
            }}
          >
            {data?.direction !== "D" ? (
              <>
                {dayjs(data?.scheduleDateTime).format("hh:mm A")} -{" "}
                {data?.estimatedLandingTime
                  ? dayjs(data?.estimatedLandingTime).format("hh:mm A")
                  : "No Data"}
              </>
            ) : (
              <>
                {data?.estimatedLandingTime
                  ? dayjs(data?.estimatedLandingTime).format("hh:mm A")
                  : "No Data"}
                - {dayjs(data?.scheduleDateTime).format("hh:mm A")}
              </>
            )}
          </div>
          <Grid
            container
            justifyContent={"space-between"}
            sx={{
              "& *": {
                fontSize: "1.2rem",
              },
            }}
          >
            <Grid item>
              <div style={{ fontWeight: "bold" }}>{data?.prefixIATA}</div>
              <div>
                <MyDialog
                  Element={Details}
                  closeProtection={false}
                  Button={() => {
                    return (
                      <Typography
                        sx={{
                          p: 0,
                          textDecoration: "underline",
                          color: "blue",
                          cursor: "pointer",
                        }}
                      >
                        Flight Details
                      </Typography>
                    );
                  }}
                  defaultWH={[550, 450]}
                  defaultOpen={false}
                  hideBackdrop={false}
                  flightData={data}
                />
              </div>
            </Grid>
            <Grid item>
              <div style={{ fontWeight: "bold" }}>
                {data?.route?.destinations?.length === 1
                  ? "Nonstop"
                  : data?.route?.destinations?.length === 2
                  ? "1 Stop"
                  : "2+ Stops"}
              </div>
            </Grid>
            <Grid item>
              <div style={{ fontWeight: "bold" }}>
                {data?.direction !== "D" && data?.route?.destinations ? (
                  <>
                    AMS to{" "}
                    {
                      data?.route?.destinations[
                        data?.route?.destinations?.length - 1
                      ]
                    }
                  </>
                ) : (
                  <>
                    {
                      data?.route?.destinations[
                        data?.route?.destinations?.length - 1
                      ]
                    }{" "}
                    to AMS
                  </>
                )}
              </div>
              <div>{data?.flightName}</div>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ pl: 1 }}>
        <Swiper
          slidesPerView={1}
          breakpoints={{
            900: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            500: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          initialSlide={2}
          grabCursor={true}
          centeredSlides={true}
          className="testimonials-swipper"
          style={{ overflow: "hidden", height: "100%" }}
        >
          {boxData.map((box, index) => (
            <SwiperSlide key={index} style={{ height: "100%" }}>
              <PriceBox price={box.price} label={box.label} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

export default MyCard;
