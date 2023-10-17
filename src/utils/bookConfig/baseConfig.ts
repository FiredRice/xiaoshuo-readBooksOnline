export default [
	{
		label: "起点",
		baseUrl: "https://www.qidian.com",
		ssr: false,
		webCode: "",
		searchBook: {
			searchUrl: "https://www.qidian.com/soushu/${name}.html",
			nameCode: "encodeURI",
			listElement: ".volume",
			itemElement: ".res-book-item",
			nameElement: ".book-info-title",
			authorElement: ".author",
			hrefElement: "a", //跳转标签元素
		},
		chaptersConfig: {
			baseUrl: "https:",
			listElement: ".catalog-all",
			itemElement: "li",
			nameElement: "a",
			hrefElement: "a", //跳转标签元素
		},
		textConfig: {
			baseUrl: "https:",
			contentElemen: ".relative", //小说文本标签元素
		},
	},
	{
		label: "晋江",
		baseUrl: "",
		ssr: false,
		webCode: "gbk",
		searchBook: {
			searchUrl: "https://www.jjwxc.net/search.php?kw=${name}&t=1",
			nameCode: "gbk",
			listElement: "#search_result",
			itemElement: "h3",
			nameElement: "a",
			authorElement: "",
			hrefElement: "a", //跳转标签元素
		},
		chaptersConfig: {
			baseUrl: "",
			listElement: ".cytable",
			itemElement: "tr",
			nameElement: "a",
			hrefElement: "a", //跳转标签元素
		},
		textConfig: {
			baseUrl: "",
			contentElemen: ".novelbody", //小说文本标签元素
		},
	}
];
