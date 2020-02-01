import React, { useState } from "react";
import { createArticle } from "../../modules/article";
import {
  Header,
  Input,
  Button,
  TextArea,
  Form,
  Select,
  Tab
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const CreateArticle = () => {
  const [submitArticleMessage, setSubmitArticleMessage] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [category, setCategory] = useState("");
  const { t } = useTranslation();

  const submitArticleHandler = async e => {
    e.preventDefault();
    const response = await createArticle(
      e.target.title_en.value,
      e.target.title_sv.value,
      e.target.body_en.value,
      e.target.body_sv.value,
      category,
      imageBase64
    );

    if (response.status === 200) {
      setSubmitArticleMessage(
        "Your article was successfully submitted for review."
      );
    } else if (response.status === 422) {
      setSubmitArticleMessage("Your article must have a title and content.");
    }
  };

  const imageUploadHandler = async e => {
    const image = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(image);
  };

  const categories = [
    { key: "nw", value: "news", text: "News" },
    { key: "fd", value: "food", text: "Food" },
    { key: "th", value: "tech", text: "Tech" },
    { key: "cu", value: "culture", text: "Culture" },
    { key: "sp", value: "sports", text: "Sports" },
    { key: "mi", value: "misc", text: "Misc" }
  ];

  const panes = [
    { menuItem: 'English', render: () => 
      <Tab.Pane>
        <Form.Field control={Input} label="Title" id="title_en" />
        <Form.Field control={TextArea} label="Body" id="body_en" />
      </Tab.Pane> 
      
    },
    { menuItem: 'Svenska', render: () => 
      <Tab.Pane>
        <Form.Field control={Input} label="Titel" id="title_sv" />
        <Form.Field control={TextArea} label="Innehåll" id="body_sv" />
      </Tab.Pane> 
      
    },
  ]

  return (
    <>
      <Header>{t("admin.createArticle")}</Header>
      <Form id="article-form" onSubmit={submitArticleHandler}>
        <Tab panes={panes} style={{paddingBottom: "20px" }}/>
        <div id="image-preview">
          {imageBase64 ? (
            <img
              src={imageBase64}
              style={{ maxWidth: "256px" }}
              alt="preview"
            ></img>
          ) : null}
        </div>
        <Select
          id="selector"
          placeholder="Select category"
          onChange={(e, data) => setCategory(data.value)}
          options={categories}
        />
        <Form.Field className="ui button" as="label" htmlFor="image-upload">
          {t("admin.addImage")}
        </Form.Field>
        <input
          type="file"
          id="image-upload"
          style={{ display: "none" }}
          onChange={e => imageUploadHandler(e)}
        />
        <Form.Field control={Button} type="submit" id="submit">
          {t("login.submit")}
        </Form.Field>
      </Form>
      <p id="create-article-message">{submitArticleMessage}</p>
    </>
  );
};

export default CreateArticle;
