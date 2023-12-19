import ReactMarkdown from 'react-markdown';
import MathJax from 'mathjax';
import RemarkMathPlugin from 'remark-math';

function MarkdownRender(props: { renderers: any; }) {
    const newProps = {
        ...props,
        plugins: [
          RemarkMathPlugin,
        ],
        renderers: {
          ...props.renderers,
          math: (props: { value: any; }) => 
            <MathJax.Node formula={props.value} />,
          inlineMath: (props: { value: any; }) =>
            <MathJax.Node inline formula={props.value} />
        }
      };
      return (
        <MathJax.Provider input="tex">
            <ReactMarkdown children={''} {...newProps} />
        </MathJax.Provider>
      );
}

export default MarkdownRender