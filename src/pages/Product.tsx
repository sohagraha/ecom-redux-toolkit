import { useState } from 'react';

const randomColorGen = () => {
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  console.log(color);
  return color;
};

const Product = () => {
  const data = [
    {
      id: 1,
      content: 'Head',
      isParent: true,
      color: randomColorGen(),
    },
  ];

  const [dataState, setDataState] = useState(data);

  const handleside = (items: any, type: string) => {
    const newChild = [
      {
        id: items?.id * 2,
        type: type,
        content: '11',
        color: items?.color,
        parent_id: items?.id,
      },
      {
        id: items?.id * 2 + 1,
        type: type,
        color: randomColorGen(),
        content: 'C1-2',
        parent_id: items?.id,
      },
    ];

    const findId = (data: any) => {
      return data.map((item: any) => {
        if (item.id === items?.id) {
          item.children = newChild;
        } else if (item.children) {
          item.children = findId(item.children);
        }
        return item;
      });
    };

    // set new data
    setDataState(findId(dataState));

    console.log(dataState);
  };

  const removeChild = (item: any) => {
    const findId = (data: any) => {
      return data.map((i: any) => {
        if (i.id === item?.parent_id) {
          i.children = i.children?.filter(
            (child: any) => child.id !== item?.id
          );

          if (i?.type === 's') {
            i.children = i.children?.map((child: any) => {
              child.type = 'u';
              return child;
            });
          }

          if (i?.children?.length === 0) {
            delete i.children;
          }
        } else if (i.children) {
          i.children = findId(i.children);
        }
        return i;
      });
    };

    // set new data
    setDataState(findId(dataState));

    console.log(dataState);
  };

  const renderChildren = (children: any) => {
    return (
      <div
        style={{
          //   display: `${children[0].type === 's' ? 'flex' : 'block'}`,
          display: 'flex',
          flexDirection: `${children[0].type === 's' ? 'column' : 'row'}`,
        }}
      >
        {children.map((item: any, i: any) => {
          console.log(children?.isParent);
          return (
            <div
              style={{
                width: `${children[0].type === 'v' ? 50 : 100}%`,
                backgroundColor: `${item.color}`,
                height: `${children[0]?.isParent ? '100vh' : '50%'}`,
              }}
            >
              {/* <div className="text-center h-10">{item.contenta}</div> */}
              {!item.children ? (
                <div>
                  <button
                    // className="bg-red-500 p-2"
                    onClick={() => {
                      handleside(item, 's');
                    }}
                  >
                    V
                  </button>
                  <button
                    onClick={() => {
                      handleside(item, 'u');
                    }}
                  >
                    H
                  </button>
                  <button
                    // className="bg-red-500 p-2"
                    onClick={() => {
                      removeChild(item);
                    }}
                  >
                    -
                  </button>
                </div>
              ) : // <button
              //   className="bg-red-500 p-2"
              //   onClick={() => {
              //     removeChild(item);
              //   }}
              // >
              //   -
              // </button>
              null}
              {item.children && renderChildren(item.children)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="m-5"
      style={{
        height: '100vh',
      }}
    >
      <>{renderChildren(dataState)}</>
    </div>
  );
};

export default Product;
