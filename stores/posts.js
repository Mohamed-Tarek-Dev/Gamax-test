export const usePostStore = defineStore('posts', {
	state: () => ({
		AllPosts: [],
		PersonalPosts: [],
		ActivePost: false,
		EditingPost: false,
		EditingComment: false,
		ActiveReactsList: false,
		AllPostsTime: {
			PostTime: '',
			QuestionTime: '',
		},
		PersonalPostsTime: {
			PostTime: '',
			QuestionTime: '',
		},
	}),
	getters: {},
	actions: {
		SetAllPosts(data) {
			data.forEach((entry) => {
				let exists = this.AllPosts.some((obj) => obj.id === entry.id);
				if (!exists) {
					this.AllPosts.push(entry);
					if (entry.type == 1) {
						this.AllPostsTime.QuestionTime = entry.time;
					} else {
						this.AllPostsTime.PostTime = entry.time;
					}
				}
			});
		},
		SetPersonalPosts(data) {
			this.PersonalPostsPageNumber++;
			data.forEach((entry) => {
				let exists = this.PersonalPosts.some(
					(obj) => obj.id === entry.id
				);
				if (!exists) {
					this.PersonalPosts.push(entry);
					if (entry.type == 1) {
						this.PersonalPostsTime.QuestionTime = entry.time;
					} else {
						this.PersonalPostsTime.PostTime = entry.time;
					}
				}
			});
		},
		ResetPersonalPosts() {
			this.PersonalPosts = [];
			this.PersonalPostsTime = {
				PostTime: '',
				QuestionTime: '',
			};
		},
		ResetAllPosts() {
			this.AllPosts = [];
			this.AllPostsTime = {
				PostTime: '',
				QuestionTime: '',
			};
		},
		InitEditPost(post, Files, IsPersonal, isActive) {
			this.EditingPost = {
				id: post.id,
				Files: Files,
				type: post.type,
				PostDescription: post.description || post.question,
				userId: post.userId,
				IsPersonal: IsPersonal || false,
				IsActivePost: isActive || false,
			};
		},
		CancelEditingPost() {
			this.EditingPost = false;
		},
		AddNewPost(post, isPersonal, type) {
			if (!isPersonal) {
				let NewPosts = [];
				post.type = type;
				NewPosts.push(post);
				this.AllPosts.forEach((entry) => NewPosts.push(entry));
				this.AllPosts = NewPosts;
			} else {
				let NewPosts = [];
				post.type = type;
				NewPosts.push(post);
				this.PersonalPosts.forEach((entry) => NewPosts.push(entry));
				this.PersonalPosts = NewPosts;
			}
		},
		EditPostWithId(id, post, isPersonal, isActive) {
			if (isActive) {
				this.ActivePost = { ...post, type: this.ActivePost.type };
				return;
			}
			if (!isPersonal) {
				let index = this.AllPosts.findIndex((v) => v.id == id);
				if (index == -1) return;
				this.AllPosts[index] = post;
			} else {
				let index = this.PersonalPosts.findIndex((v) => v.id == id);
				if (index == -1) return;
				this.PersonalPosts[index] = post;
			}
		},
		RemovePostWithId(id) {
			this.AllPosts = this.AllPosts.filter((post) => post.id != id);
		},

		InitEditComment(comment, Files, IsPersonal, isActive, type, PostId) {
			this.EditingComment = {
				id: comment.id,
				Files: Files,
				type: type,
				Comment: comment.comment,
				userId: comment.userId,
				IsPersonal: IsPersonal || false,
				IsActivePost: isActive || false,
				PostId: PostId,
			};
		},
		CancelEditingComment() {
			this.EditingComment = false;
		},
		GetMorePostComments(id, comments, isPersonal, isActive) {
			if (isActive) {
				comments.forEach((comment) => {
					let exists = this.ActivePost.comments.some(
						(obj) => obj.id === comment.id
					);
					if (!exists) {
						this.ActivePost.comments.push(comment);
					}
				});
				return;
			}
			if (!isPersonal) {
				let index = this.AllPosts.findIndex((v) => v.id == id);
				if (index == -1) return;
				comments.forEach((comment) => {
					let exists = this.AllPosts[index].comments.some(
						(obj) => obj.id === comment.id
					);
					if (!exists) {
						this.AllPosts[index].comments.push(comment);
					}
				});
			} else {
				let index = this.PersonalPosts.findIndex((v) => v.id == id);
				if (index == -1) return;
				comments.forEach((comment) => {
					let exists = this.PersonalPosts[index].comments.some(
						(obj) => obj.id === comment.id
					);
					if (!exists) {
						this.PersonalPosts[index].comments.push(comment);
					}
				});
			}
		},
		AddNewPostComment(id, comment, isPersonal, isActive) {
			if (isActive) {
				let NewComments = [];
				NewComments.push(comment);
				this.ActivePost.comments.forEach((entry) =>
					NewComments.push(entry)
				);
				this.ActivePost.comments = NewComments;
				this.ActivePost.commentsCount++;
				return;
			}
			if (!isPersonal) {
				let NewComments = [];
				NewComments.push(comment);
				let index = this.AllPosts.findIndex((val) => val.id == id);
				this.AllPosts[index].comments.forEach((entry) =>
					NewComments.push(entry)
				);
				this.AllPosts[index].comments = NewComments;
				this.AllPosts[index].commentsCount++;
			} else {
				let NewComments = [];
				NewComments.push(comment);
				let index = this.PersonalPosts.findIndex((val) => val.id == id);
				this.PersonalPosts[index].comments.forEach((entry) =>
					NewComments.push(entry)
				);
				this.PersonalPosts[index].comments = NewComments;
				this.AllPPersonalPostsosts[index].commentsCount++;
			}
		},
		RemoveCommentIdFromPost(CommentId, postId, isPersonal, isActive) {
			if (isActive) {
				this.ActivePost.comments = this.ActivePost.comments.filter(
					(comm) => comm.id != CommentId
				);
				this.ActivePost.commentsCount--;
				return;
			}
			if (!isPersonal) {
				let postIndex = this.AllPosts.findIndex(
					(val) => val.id == postId
				);
				this.AllPosts[postIndex].comments = this.AllPosts[
					postIndex
				].comments.filter((comm) => comm.id != CommentId);
				this.AllPosts[postIndex].commentsCount--;
			} else {
				let postIndex = this.PersonalPosts.findIndex(
					(val) => val.id == postId
				);
				this.PersonalPosts[postIndex].comments = this.PersonalPosts[
					postIndex
				].comments.filter((comm) => comm.id != CommentId);
				this.PersonalPosts[postIndex].commentsCount--;
			}
		},
		EditCommentWithId(commentid, comment, isPersonal, postid, isActive) {
			if (isActive) {
				let commentindex = this.ActivePost.comments.findIndex(
					(comment) => comment.id == commentid
				);
				if (commentindex == -1) return;
				this.ActivePost.comments[commentindex] = comment;
				return;
			}
			if (!isPersonal) {
				let postindex = this.AllPosts.findIndex((v) => v.id == postid);
				if (postindex == -1) return;
				let commentindex = this.AllPosts[postindex].comments.findIndex(
					(comment) => comment.id == commentid
				);
				if (commentindex == -1) return;
				this.AllPosts[postindex].comments[commentindex] = comment;
			} else {
				let postindex = this.PersonalPosts.findIndex(
					(v) => v.id == postid
				);
				if (postindex == -1) return;
				let commentindex = this.PersonalPosts[
					postindex
				].comments.findIndex((comment) => comment.id == commentid);
				if (commentindex == -1) return;
				this.PersonalPosts[postindex].comments[commentindex] = comment;
			}
		},

		RemoveReactFromComment(
			reactid,
			commentid,
			isPersonal,
			isActive,
			postid
		) {
			if (isActive) {
				let commentindex = this.ActivePost.comments.findIndex(
					(comment) => comment.id == commentid
				);
				if (commentindex == -1) return;
				this.ActivePost.comments[commentindex].commentReacts =
					this.ActivePost.comments[commentindex].commentReacts.filter(
						(react) => react.id != reactid
					);
				return;
			}
			if (!isPersonal) {
				let postindex = this.AllPosts.findIndex((v) => v.id == postid);
				if (postindex == -1) return;
				let commentindex = this.AllPosts[postindex].comments.findIndex(
					(comment) => comment.id == commentid
				);
				if (commentindex == -1) return;
				this.AllPosts[postindex].comments[commentindex].commentReacts =
					this.AllPosts[postindex].comments[
						commentindex
					].commentReacts.filter((react) => react.id != reactid);
			} else {
				let postindex = this.PersonalPosts.findIndex(
					(v) => v.id == postid
				);
				if (postindex == -1) return;
				let commentindex = this.PersonalPosts[
					postindex
				].comments.findIndex((comment) => comment.id == commentid);
				if (commentindex == -1) return;
				this.PersonalPosts[postindex].comments[
					commentindex
				].commentReacts = this.PersonalPosts[postindex].comments[
					commentindex
				].commentReacts.filter((react) => react.id != reactid);
			}
		},
		UpdateReactComment(
			reactid,
			commentid,
			isPersonal,
			isActive,
			postid,
			newreact
		) {
			if (isActive) {
				let commentindex = this.ActivePost.comments.findIndex(
					(comment) => comment.id == commentid
				);
				if (commentindex == -1) return;
				let reactindex = this.ActivePost.comments[
					commentindex
				].commentReacts.findIndex((react) => react.id == reactid);
				this.ActivePost.comments[commentindex].commentReacts[
					reactindex
				].react = newreact;
				return;
			}
			if (!isPersonal) {
				let postindex = this.AllPosts.findIndex((v) => v.id == postid);
				if (postindex == -1) return;
				let commentindex = this.AllPosts[postindex].comments.findIndex(
					(comment) => comment.id == commentid
				);
				if (commentindex == -1) return;
				let reactindex = this.AllPosts[postindex].comments[
					commentindex
				].commentReacts.findIndex((react) => react.id == reactid);
				this.AllPosts[postindex].comments[commentindex].commentReacts[
					reactindex
				].react = newreact;
			} else {
				let postindex = this.PersonalPosts.findIndex(
					(v) => v.id == postid
				);
				if (postindex == -1) return;
				let commentindex = this.PersonalPosts[
					postindex
				].comments.findIndex((comment) => comment.id == commentid);
				if (commentindex == -1) return;
				let reactindex = this.PersonalPosts[postindex].comments[
					commentindex
				].commentReacts.findIndex((react) => react.id == reactid);
				this.PersonalPosts[postindex].comments[
					commentindex
				].commentReacts[reactindex].react = newreact;
			}
		},
		AddReactToComment(commentid, isPersonal, isActive, postid, newreact) {
			if (isActive) {
				let commentindex = this.ActivePost.comments.findIndex(
					(comment) => comment.id == commentid
				);
				if (commentindex == -1) return;
				this.ActivePost.comments[commentindex].commentReacts.push(
					newreact
				);
				return;
			}
			if (!isPersonal) {
				let postindex = this.AllPosts.findIndex((v) => v.id == postid);
				if (postindex == -1) return;
				let commentindex = this.AllPosts[postindex].comments.findIndex(
					(comment) => comment.id == commentid
				);
				if (commentindex == -1) return;
				this.AllPosts[postindex].comments[
					commentindex
				].commentReacts.push(newreact);
			} else {
				let postindex = this.PersonalPosts.findIndex(
					(v) => v.id == postid
				);
				if (postindex == -1) return;
				let commentindex = this.PersonalPosts[
					postindex
				].comments.findIndex((comment) => comment.id == commentid);
				if (commentindex == -1) return;
				this.PersonalPosts[postindex].comments[
					commentindex
				].commentReacts.push(newreact);
			}
		},

		RemoveReactFromPost(reactid, postid, isPersonal, isActive) {
			if (isActive) {
				this.ActivePost.reacts = this.ActivePost.reacts.filter(
					(react) => react.id != reactid
				);
				return;
			}
			if (!isPersonal) {
				let postindex = this.AllPosts.findIndex((v) => v.id == postid);
				if (postindex == -1) return;
				this.AllPosts[postindex].reacts = this.AllPosts[
					postindex
				].reacts.filter((react) => react.id != reactid);
			} else {
				let postindex = this.PersonalPosts.findIndex(
					(v) => v.id == postid
				);
				if (postindex == -1) return;
				this.PersonalPosts[postindex].reacts = this.PersonalPosts[
					postindex
				].reacts.filter((react) => react.id != reactid);
			}
		},
		UpdatePostReact(reactid, postid, isPersonal, isActive, newreact) {
			if (isActive) {
				let reactindex = this.ActivePost.reacts.findIndex(
					(react) => react.id == reactid
				);
				this.ActivePost.reacts[reactindex].react = newreact;
				return;
			}
			if (!isPersonal) {
				let postindex = this.AllPosts.findIndex((v) => v.id == postid);
				if (postindex == -1) return;
				let reactindex = this.AllPosts[postindex].reacts.findIndex(
					(react) => react.id == reactid
				);
				this.AllPosts[postindex].reacts[reactindex].react = newreact;
			} else {
				let postindex = this.PersonalPosts.findIndex(
					(v) => v.id == postid
				);
				if (postindex == -1) return;
				let reactindex = this.PersonalPosts[postindex].reacts.findIndex(
					(react) => react.id == reactid
				);
				this.PersonalPosts[postindex].reacts[reactindex].react =
					newreact;
			}
		},
		AddReactToPost(postid, isPersonal, isActive, newreact) {
			if (isActive) {
				this.ActivePost.reacts.push(newreact);
				return;
			}
			if (!isPersonal) {
				let postindex = this.AllPosts.findIndex((v) => v.id == postid);
				if (postindex == -1) return;
				this.AllPosts[postindex].reacts.push(newreact);
			} else {
				let postindex = this.PersonalPosts.findIndex(
					(v) => v.id == postid
				);
				if (postindex == -1) return;
				this.PersonalPosts[postindex].reacts.push(newreact);
			}
		},
		SetActiveReactList(list) {
			this.ActiveReactsList = list;
		},
		SetActivePost(post, type) {
			this.ActivePost = { ...post, type: type || 0 };
		},
		ResetActivePost() {
			this.ActivePost = false;
		},
	},
});
