import React from "react";

const Media = (props) => {
  const { block, contentState } = props;
  const data = contentState.getEntity(block.getEntityAt(0)).getData();
  const emptyHtml = " ";

  return (
    <div>
      {emptyHtml}
      <img
        src={data.src}
        alt={data.alt || ""}
        style={{ height: data.height || "auto", width: data.width || "auto" }}
      />
    </div>
  );
};

export const myBlockRenderer = (contentBlock)=> {
	const type = contentBlock.getType();

	// 图片类型转换为mediaComponent
	if (type === 'atomic') {
		return {
			component: Media,
			editable: false,
			props: {
				foo: 'bar',
			},
		};
	}
};
