import React,{useState} from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from "react-redux";
import { myBlockRenderer } from './Media';
import { postFileRequest } from '../../../api/ajax';

const RichTextEditor = () => {

  const product = useSelector((state)=>state.productReducer);
  const initContent=(product)=>{
    const {detail} = product;
    if(detail!==''){
      const contentBlock = htmlToDraft(detail);
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			const editorState = EditorState.createWithContent(contentState);
			return editorState;
    }
    return EditorState.createEmpty();
  }
  const [editorState,setEditorState] = useState(initContent(product));

  const onEditorStateChange =(editorState)=>{
    setEditorState(editorState)
  }
  const uploadImageCallBack = async(file) => {
    const data = new FormData()
    data.append('image', file);
    const result = await postFileRequest('/uploadFile',data);
    if(result){
      const url =result.data?.url ?? ''; // 得到图片的url
      const name = result.data?.name ?? '';
      return Promise.resolve({data: { link: url + '/files/' + name }});
    }
  }
  return (
    <div>
 				<Editor
					editorState={editorState}
					editorStyle={{ border: '1px solid black', minHeight: 200 }}
          onEditorStateChange={onEditorStateChange}
          customBlockRenderFunc={myBlockRenderer}
					toolbar={{
						inline: { inDropdown: true },
						list: { inDropdown: true },
						textAlign: { inDropdown: true },
						link: { inDropdown: true },
						history: { inDropdown: true },
						image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
					}}
				/>
			</div>
  )
}

export default RichTextEditor
