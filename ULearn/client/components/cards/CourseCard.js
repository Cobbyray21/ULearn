import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4"
          cover={
            <img
              src={image.Location}
              alt={name}
              style={{ height: "200px", objectFit: "contain" }}
              className="p-1"
            />
          }
        >
          <h2 className="font-weight-bold text-success">{name}</h2>
          <div>Instructor: <span className="text-warning font-weight-bold"> {instructor.name}</span></div>

          <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-2 mr-2"
          />
          <h4 className="pt-2">
            {/*paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : */"Free"}
          </h4>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;





