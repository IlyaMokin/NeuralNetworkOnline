(function ($) {
	$.extend(Array.prototype, {
		sequenceEqual: function (arr) {
			var curArrCount = this.length,
				arrCount = arr.length,
				ID;
			if (curArrCount != arrCount) {
				return false;
			}
			for (ID = arrCount - 1; ID >= 0; ID -= 1) {
				if (arr[ID] != this[ID]) {
					return false;
				}
			}
			return true;
		},

		all: function (predicate) {
			var result;
			if (this.every) {
				return this.every(predicate, null);
			}
			result = false;
			this.each(function (obj, ID) {
				if (!(result = predicate.apply(null, [obj, ID]))) {
					return false;
				}
			});
			return result;
		},

		where: function (predicate) {
			var matches = [];
			if (typeof predicate == 'string') {
				this.each(function (obj) {
					if (obj[predicate]) {
						matches.push(obj);
					}
				});
			} else {
				if (this.filter) {
					return this.filter(predicate);
				}
				this.each(function (obj, ID) {
					if (predicate.apply(null, [obj, ID])) {
						matches.push(obj);
					}
				});
			}
			return matches;
		},

		first: function (predicate, value) {
			var match;
			if (!predicate) {
				return this[0];
			} else if (typeof predicate == 'string') {
				this.each(function (obj) {
					if (obj[predicate] == value) {
						match = obj;
						return false;
					}
				});
			} else {
				this.each(function (obj, ID) {
					if (predicate.apply(null, [obj, ID])) {
						match = obj;
						return false
					}
				});
			}
			return match;
		},

		skip: function (predicate) {
			var globalID = 0;
			if (typeof predicate === 'function') {
				this.each(function (obj, ID) {
					if (!predicate.apply(null, [obj, ID])) {
						globalID = ID;
						return false;
					}
				});
			} else {
				globalID = predicate;
			}
			return this.slice(globalID);
		},

		take: function (predicate) {
			var matches = [];
			this.each(function (obj, ID) {
				if (predicate.apply(null, [obj, ID])) {
					matches.push(obj);
				} else {
					return matches;
				}
			});
			return matches;
		},

		select: function (predicate, whereFunc) {
			var matches = [], index = 0;

			if (!whereFunc) {
				if (typeof predicate === 'string') {
					this.each(function (obj) {
						matches.push(obj[predicate]);
					});
				} else {
					if (this.map) {
						return this.map(predicate, null);
					}
					this.each(function (obj, ID) {
						matches.push(predicate.apply(null, [obj, ID]));
					});
				}
			} else {
				if (typeof whereFunc === 'string') {
					if (typeof predicate === 'string') {
						this.each(function (obj) {
							if (obj[whereFunc])
								matches.push(obj[predicate]);
						});
					} else {
						this.each(function (obj) {
							if (obj[whereFunc])
								matches.push(predicate.apply(null, [obj, index++]));
						});
					}
				} else {
					if (typeof predicate === 'string') {
						this.each(function (obj, ID) {
							if (whereFunc.apply(null, [obj, ID]))
								matches.push(obj[predicate]);
						});
					} else {
						this.each(function (obj, ID) {
							if (whereFunc.apply(null, [obj, ID]))
								matches.push(predicate.apply(null, [obj, index++]));
						});
					}
				}
			}

			return matches;
		},

		each: function (predicate, whereFunc) {
			var ID, len = this.length, obj, result;
			if (whereFunc) {
				if (typeof whereFunc === 'string') {
					for (ID = 0; ID < len; ID += 1) {
						obj = this[ID];
						if (obj[whereFunc]) {
							result = predicate.apply(null, [obj, ID]);
							if (result === false) {
								return;
							}
						}
					}
				} else {
					for (ID = 0; ID < len; ID += 1) {
						obj = this[ID];
						if (whereFunc.apply(null, [obj, ID])) {
							result = predicate.apply(null, [obj, ID]);
							if (result === false) {
								return;
							}
						}
					}
				}
			} else {
				for (ID = 0; ID < len; ID += 1) {
					obj = this[ID];
					result = predicate.apply(null, [obj, ID]);
					if (result === false) {
						return;
					}
				}
			}
		},

		orderBy: function (predicate) {
			if (typeof predicate === 'string') {
				return this.sort(function (a, b) {
					var aValue = a[predicate],
						bValue = b[predicate];
					return (aValue < bValue) ? -1 : ((aValue > bValue) ? 1 : 0);
				});
			} else {
				return this.sort(function (a, b) {
					var aValue = predicate.apply(a, [a]),
						bValue = predicate.apply(b, [b]);
					return (aValue < bValue) ? -1 : ((aValue > bValue) ? 1 : 0);
				});
			}
		},

		intersect: function (anotherArr) {
			var ID, anotherID, obj, matches = [];
			for (ID = this.length - 1; ID >= 0; ID -= 1) {
				for (anotherID = anotherArr.length - 1; anotherID >= 0; anotherID -= 1) {
					if ((obj = this[ID]) === anotherArr[anotherID]) {
						matches.push(obj);
					}
				}
			}
			return matches;
		},

		distinct: function (predicate) {
			var matches = [], values = [];
			if (predicate) {
				if (typeof predicate === 'string') {
					this.each(function (obj) {
						if (!values.contains(obj[predicate])) {
							matches.push(obj);
							values.push(obj[predicate]);
						}
					});
				} else {
					this.each(function (obj, ID) {
						var curValue = predicate.apply(null, [obj, ID]);
						if (!values.contains(curValue)) {
							matches.push(obj);
							values.push(curValue);
						}
					});
				}
			} else {
				this.each(function (obj) {
					if (!matches.contains(obj)) {
						matches.push(obj);
					}
				});
			}
			return matches;
		},

		getIndex: function (predicate, value) {
			var ID, obj;
			if (value && typeof predicate !== 'function') {
				for (ID = this.length - 1; ID >= 0; ID -= 1) {
					if (this[ID][predicate] === value) {
						return ID;
					}
				}
			} else if (typeof predicate !== 'function') {
				for (ID = this.length - 1; ID >= 0; ID -= 1) {
					if (this[ID] == predicate) {
						return ID;
					}
				}
			} else {
				for (ID = this.length - 1; ID >= 0; ID -= 1) {
					obj = this[ID];
					if (predicate.apply(null, [obj, ID])) {
						return ID;
					}
				}
			}
			return -1;
		},

		contains: function (predicate, value) {
			if (this.some && !value && typeof predicate === 'function') {
				return this.some(predicate, null);
			}
			return this.getIndex(predicate, value) > -1;
		},

		groupBy: function (keySelector, resultSelector) {
			var ID, length = this.length, matches = [], curItem, grouppedValue, matchID;
			for (ID = 0; ID < length; ID += 1) {
				curItem = this[ID];
				grouppedValue = keySelector.apply(curItem, [curItem]);
				matchID = matches.getIndex(function () {
					return this.key === grouppedValue;
				});
				if (matchID == -1) {
					matches.push({key: grouppedValue, values: resultSelector ? [resultSelector.apply(curItem, [curItem])] : [curItem]});
				} else {
					matches[matchID].values.push(resultSelector ? resultSelector.apply(curItem, [curItem]) : curItem);
				}
			}
			return matches;
		},

		sum: function (predicate) {
			var sum = 0;
			if (typeof predicate === 'string') {
				this.each(function (item) {
					sum += item[predicate];
				})
			} else {
				this.each(function (item, ID) {
					sum += predicate.apply(null, [item, ID]);
				});
			}

			return sum;
		}
	});
})(jQuery);

